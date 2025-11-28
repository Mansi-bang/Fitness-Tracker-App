import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getGoals, Goals } from "../services/goalStorage";
import EditGoalsModal from "../components/EditGoalsModal";

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goals | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    const data = await getGoals();
    setGoals(data);
  }

  if (!goals) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Goals 🎯</Text>

      {/* DAILY STEPS */}
      <View style={styles.card}>
        <Text style={styles.label}>Daily Step Goal</Text>
        <Text style={styles.value}>{goals.dailySteps.toLocaleString()} steps</Text>
      </View>

      {/* WEEKLY SESSIONS */}
      <View style={styles.card}>
        <Text style={styles.label}>Weekly Workouts</Text>
        <Text style={styles.value}>{goals.weeklySessions} sessions</Text>
      </View>

      {/* CALORIES */}
      <View style={styles.card}>
        <Text style={styles.label}>Daily Calorie Goal</Text>
        <Text style={styles.value}>{goals.dailyCalories} kcal</Text>
      </View>

      {/* STREAK */}
      <View style={styles.card}>
        <Text style={styles.label}>Current Streak</Text>
        <Text style={styles.value}>{goals.streak} days 🔥</Text>
      </View>

      <TouchableOpacity style={styles.editBtn} onPress={() => setShowModal(true)}>
        <Text style={styles.editText}>Edit Goals</Text>
      </TouchableOpacity>

      <EditGoalsModal
        visible={showModal}
        currentGoals={goals}
        onClose={() => {
          setShowModal(false);
          loadGoals();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 26, fontWeight: "600", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  label: { fontSize: 15, color: "#777" },
  value: { fontSize: 20, fontWeight: "700", marginTop: 4 },
  editBtn: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  editText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
