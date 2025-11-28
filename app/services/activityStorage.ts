import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityEntry } from "../data/models";

const KEY = "ACTIVITY_LOG";

export async function getActivities(): Promise<ActivityEntry[]> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveActivity(entry: ActivityEntry) {
  const list = await getActivities();
  list.push(entry);
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function deleteActivity(id: string) {
  const list = await getActivities();
  const filtered = list.filter((item) => item.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
}

export async function updateActivity(updated: ActivityEntry) {
  const list = await getActivities();
  const newList = list.map((item) =>
    item.id === updated.id ? updated : item
  );
  await AsyncStorage.setItem(KEY, JSON.stringify(newList));
}
