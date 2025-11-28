export type ActivityType = "running" | "walking" | "cycling" | "yoga" | "gym";

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  calories: number;
  duration: number; // mins
  distance?: number; // km (optional)
  date: string; // ISO string
}
