// app/services/aiService.ts

export function generateDailyMotivation(steps: number, calories: number) {
  const templates = [
    `🔥 You're on fire! ${steps} steps already — keep pushing!`,
    `💪 Great work so far! You've burned ${calories} kcal. Let's hit one more small goal today!`,
    `🚀 You're building momentum. Stay consistent and crush your targets!`,
    `🌟 Amazing! Every step you take today counts toward a better you.`,
    `🏅 You're doing great. Add a 10-minute walk to boost your energy!`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

export function generateWorkoutSuggestion() {
  const workouts = [
    "Try a 20-minute brisk walk today 🚶‍♂️",
    "Do a 15-minute stretch + mobility session 🧘‍♀️",
    "Go for a 10-minute jog to activate your body 🏃‍♂️",
    "Add 20 squats + 10 pushups to stay active 💪",
    "Take a relaxing evening walk outdoors 🌅",
  ];

  return workouts[Math.floor(Math.random() * workouts.length)];
}

export function generateWeeklyInsight(weeklySteps: number[]) {
  const avg = Math.round(weeklySteps.reduce((a, b) => a + b, 0) / 7);
  const max = Math.max(...weeklySteps);
  const min = Math.min(...weeklySteps);

  return `
📊 Weekly Summary:
• Average steps: ${avg}
• Best day: ${max} steps
• Lightest day: ${min} steps

💡 Keep up the streak! Try adding a short evening walk to increase consistency.
`;
}
