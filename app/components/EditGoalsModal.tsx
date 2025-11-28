import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Goals, saveGoals } from "../services/goalStorage";

export default function EditGoalsModal({
  visible,
  onClose,
  currentGoals,
}: {
  visible: boolean;
  onClose: () => void;
  currentGoals: Goals;
}) {
  const [steps, setSteps] = useState(String(currentGoals.dailySteps));
  const [sessions, setSessions] = useState(
    String(currentGoals.weeklySessions)
  );
  const [calories, setCalories] = useState(String(currentGoals.dailyCalories));

  async function save() {
    await saveGoals({
      ...currentGoals,
      dailySteps: Number(steps),
      weeklySessions: Number(sessions),
      dailyCalories: Number(calories),
    });
    onClose();
  }

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Edit Goals</Text>

          <Text style={styles.label}>Daily Steps</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={steps}
            onChangeText={setSteps}
          />

          <Text style={styles.label}>Weekly Sessions</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={sessions}
            onChangeText={setSessions}
          />

          <Text style={styles.label}>Daily Calories</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={save}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  saveBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700" },
  cancel: {
    textAlign: "center",
    marginTop: 12,
    color: "#555",
    fontSize: 16,
  },
});
