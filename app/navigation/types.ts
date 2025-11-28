export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainTabsParamList = {
  Dashboard: undefined;
  ActivityLog: undefined;
  Goals: undefined;
  Analytics: undefined;
  AIInsights: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  WorkoutDetail: { workoutId: string };
};
