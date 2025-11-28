import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { generateDailyMotivation, generateWorkoutSuggestion, generateWeeklyInsight } from "../services/aiService";

export default function AIInsightsScreen() {
  const [motivation, setMotivation] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [weeklyInsight, setWeeklyInsight] = useState("");

  // Demo data (replace with real stats later)
  const todaySteps = 4325;
  const todayCalories = 210;
  const weeklySteps = [3500, 4200, 5800, 3000, 7200, 8000, 5000];

  useEffect(() => {
    refreshAI();
  }, []);

  function refreshAI() {
    setMotivation(generateDailyMotivation(todaySteps, todayCalories));
    setSuggestion(generateWorkoutSuggestion());
    setWeeklyInsight(generateWeeklyInsight(weeklySteps));
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Insights 🤖</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Motivation</Text>
        <Text style={styles.cardText}>{motivation}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Workout Suggestion</Text>
        <Text style={styles.cardText}>{suggestion}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Summary</Text>
        <Text style={styles.cardText}>{weeklyInsight}</Text>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={refreshAI}>
        <Text style={styles.refreshText}>Refresh Insights</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F8F9FA" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  cardText: { fontSize: 16, color: "#444", lineHeight: 22 },

  refreshButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  refreshText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
