// app/services/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import workoutsData from "../data/workouts.json";
import goalsData from "../data/goals.json";
import userData from "../data/user.json";

export default class Storage {
  // Load from async or fallback JSON
  static async load(key: string, fallback: any) {
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  }

  static async save(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  // Workouts
  static async getWorkouts() {
    return await Storage.load("workouts", workoutsData);
  }

  static async addWorkout(newWorkout: any) {
    const current = await Storage.getWorkouts();
    const updated = [...current, newWorkout];
    await Storage.save("workouts", updated);
    return updated;
  }

  // Goals
  static async getGoals() {
    return await Storage.load("goals", goalsData);
  }

  static async updateGoals(goals: any) {
    await Storage.save("goals", goals);
  }

  // User
  static async getUser() {
    return await Storage.load("user", userData);
  }

  static async updateUser(data: any) {
    await Storage.save("user", data);
  }
}
