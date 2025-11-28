// app/services/goalStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Goals {
  dailySteps: number;
  weeklySessions: number;
  dailyCalories: number;
  streak: number; // days continuously reaching step goal
  lastCompletedDate: string | null;
}

const KEY = "USER_GOALS";

const defaultGoals: Goals = {
  dailySteps: 10000,
  weeklySessions: 5,
  dailyCalories: 300,
  streak: 0,
  lastCompletedDate: null,
};

export async function getGoals(): Promise<Goals> {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : defaultGoals;
  } catch (err) {
    console.log("Error loading goals", err);
    return defaultGoals;
  }
}

export async function saveGoals(goals: Goals) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(goals));
  } catch (err) {
    console.log("Error saving goals", err);
  }
}

export async function updateStreak(stepsToday: number) {
  const goals = await getGoals();

  const today = new Date().toDateString();
  const lastDay = goals.lastCompletedDate;

  // Did user meet the step goal today?
  if (stepsToday >= goals.dailySteps) {
    if (lastDay === today) return; // already counted

    if (lastDay === new Date(Date.now() - 86400000).toDateString()) {
      goals.streak += 1; // continue streak
    } else {
      goals.streak = 1; // reset / start streak
    }

    goals.lastCompletedDate = today;
    await saveGoals(goals);
  }
}
