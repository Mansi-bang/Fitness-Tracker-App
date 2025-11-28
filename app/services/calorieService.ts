const MET_VALUES = {
  running: 9.8,
  walking: 3.8,
  cycling: 7.5,
  yoga: 3.0,
  gym: 6.0,
};

const USER_WEIGHT = 70; // kg (you can make user-selectable)

export function calculateCalories(type: string, duration: number) {
  const met = MET_VALUES[type] || 4.0;
  return Math.round((met * 3.5 * USER_WEIGHT * duration) / 200);
}
