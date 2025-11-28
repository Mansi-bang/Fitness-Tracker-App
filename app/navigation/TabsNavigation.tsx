import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import ActivityLogScreen from "../screens/ActivityLogScreen";
import GoalsScreen from "../screens/GoalsScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import AIInsightsScreen from "../screens/AIInsightsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MainTabsParamList } from "./types";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function TabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4E6EF2",
        tabBarInactiveTintColor: "#999",
        tabBarIcon: ({ color, size }) => {
          const icons: any = {
            Dashboard: "home",
            ActivityLog: "create",
            Goals: "flag",
            Analytics: "stats-chart",
            AIInsights: "sparkles",
            Profile: "person",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="ActivityLog" component={ActivityLogScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="AIInsights" component={AIInsightsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
