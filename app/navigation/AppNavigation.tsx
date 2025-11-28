import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ActivityLogScreen from "../screens/ActivityLogScreen";
import GoalsScreen from "../screens/GoalsScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import AIInsightsScreen from "../screens/AIInsightsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ----------------------------
// MAIN APP TABS
// ----------------------------
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Dashboard":
              iconName = "home-outline";
              break;
            case "Activity":
              iconName = "barbell-outline";
              break;
            case "Goals":
              iconName = "trophy-outline";
              break;
            case "Analytics":
              iconName = "stats-chart-outline";
              break;
            case "AI":
              iconName = "sparkles-outline";
              break;
            case "Profile":
              iconName = "person-circle-outline";
              break;
            default:
              iconName = "apps-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Activity" component={ActivityLogScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="AI" component={AIInsightsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ----------------------------
// AUTH SCREENS + MAIN APP
// ----------------------------
export default function AppNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // change later when building auth

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="MainTabs" component={BottomTabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

