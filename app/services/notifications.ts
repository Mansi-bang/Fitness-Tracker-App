// app/services/notifications.ts
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export default class NotificationService {
  static async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }

  // Schedule daily reminder
  static async scheduleDailyReminder(hour: number = 9, minute: number = 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Fitness Reminder 💪",
        body: "Don't forget your workout today!",
        sound: true,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  }

  // Schedule goal completion reminder
  static async scheduleGoalNotification(goal: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Goal Reminder 🎯",
        body: `You're getting close to your goal: ${goal}`,
      },
      trigger: { seconds: 5 },
    });
  }

  // Cancel all notifications
  static async cancelAll() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Configure Android channel
  static setupNotificationChannel() {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      });
    }
  }
}
