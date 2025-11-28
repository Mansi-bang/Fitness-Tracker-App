import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  // Demo live stats
  const [steps, setSteps] = useState(3456);
  const [calories, setCalories] = useState(220);
  const [distance, setDistance] = useState(2.1);

  // Demo weekly steps
  const weeklySteps = [3500, 4200, 5000, 3000, 6000, 7000, 4500];

  return (
    <ScrollView style={styles.container}>
      
      {/* HERO IMAGE */}
      <Image
        source={require("../assets/images/hero.png")}
        style={styles.hero}
        resizeMode="cover"
      />

      {/* Greeting */}
      <Text style={styles.greeting}>Good Morning 👋</Text>
      <Text style={styles.subtext}>Here’s your progress today</Text>

      {/* Live Stats */}
      <View style={styles.statsRow}>
        <StatCard title="Steps" value={steps} icon="walk-outline" />
        <StatCard title="Calories" value={`${calories} kcal`} icon="flame-outline" />
        <StatCard title="Distance" value={`${distance} km`} icon="map-outline" />
      </View>

      {/* Chart */}
      <Text style={styles.sectionTitle}>Weekly Progress</Text>

      <LineChart
        data={{
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: [{ data: weeklySteps }],
        }}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => "#4CAF50",
          labelColor: () => "#555",
          decimalPlaces: 0,
        }}
        bezier
        style={styles.chart}
      />

      {/* Activities */}
      <Text style={styles.sectionTitle}>Today’s Activity</Text>

      <ActivityItem
        title="Running"
        kcal="220 kcal"
        time="25 mins"
        image={require("../assets/images/running.png")}
      />

      <ActivityItem
        title="Cycling"
        kcal="340 kcal"
        time="40 mins"
        image={require("../assets/images/cycling.png")}
      />

      {/* Quick Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Activity</Text>
      </TouchableOpacity>

      {/* Achievements */}
      <Text style={styles.sectionTitle}>Achievements</Text>

      <View style={styles.badgeRow}>
        <Image
          source={require("../assets/images/trophy.png")}
          style={styles.badgeIcon}
        />
        <Text style={styles.badgeText}>5-Day Workout Streak 🔥</Text>
      </View>

      <View style={styles.badgeRow}>
        <Image
          source={require("../assets/images/medal.png")}
          style={styles.badgeIcon}
        />
        <Text style={styles.badgeText}>2,500 Calories This Week 🏅</Text>
      </View>
    </ScrollView>
  );
}

/* ------------ COMPONENTS ------------ */

function StatCard({ title, value, icon }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={26} color="#4CAF50" />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function ActivityItem({ title, kcal, time, image }) {
  return (
    <View style={styles.activityCard}>
      <Image source={image} style={styles.activityImage} />
      <View>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityText}>{kcal} • {time}</Text>
      </View>
    </View>
  );
}

/* ------------ STYLES ------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F8F9FA",
  },

  hero: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    marginBottom: 20,
  },

  greeting: {
    fontSize: 26,
    fontWeight: "700",
  },

  subtext: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    width: "32%",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  statTitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  chart: {
    borderRadius: 16,
  },

  activityCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  activityImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  activityText: {
    fontSize: 14,
    color: "#666",
  },

  addButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 14,
    marginTop: 15,
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  badgeIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },

  badgeText: {
    fontSize: 15,
    fontWeight: "600",
  },
});


