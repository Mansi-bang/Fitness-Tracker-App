import { useState } from "react";

export type WorkoutType =
  | "running"
  | "walking"
  | "cycling"
  | "yoga"
  | "gym";

const MET_VALUES = {
  running: 9.8,
  walking: 3.5,
  cycling: 7.5,
  yoga: 3.0,
  gym: 6.0,
};

export default function useCaloriesCalculator() {
  const [calories, setCalories] = useState(0);

  const calculateCalories = ({
    workoutType,
    weightKg,
    durationMin,
  }: {
    workoutType: WorkoutType;
    weightKg: number;
    durationMin: number;
  }) => {
    const met = MET_VALUES[workoutType];
    const hours = durationMin / 60;

    const result = met * weightKg * hours;
    setCalories(parseFloat(result.toFixed(2)));

    return result;
  };

  return { calories, calculateCalories };
}
