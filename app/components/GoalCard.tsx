import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  goal: string;
  target: string;
  progress: number; // % completed
}

export default function GoalCard({ goal, target, progress }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.goal}>{goal}</Text>
      <Text style={styles.target}>{target}</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.percent}>{progress}% completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 14,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  goal: { fontSize: 16, color: "#999" },
  target: { fontSize: 22, fontWeight: "700", marginTop: 4 },
  progressBar: {
    height: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginVertical: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4E6EF2",
    borderRadius: 10,
  },
  percent: { color: "#666", fontSize: 14, marginTop: 4 },
});
