import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";

import { ActivityEntry, ActivityType } from "../data/models";
import { getActivities, saveActivity, deleteActivity, updateActivity } from "../services/activityStorage";
import { calculateCalories } from "../services/calorieService";

export default function ActivityLogScreen() {
  const [list, setList] = useState<ActivityEntry[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<ActivityEntry | null>(null);

  const [type, setType] = useState<ActivityType>("running");
  const [duration, setDuration] = useState("30");
  const [distance, setDistance] = useState("1.0");

  useEffect(() => {
    loadList();
  }, []);

  async function loadList() {
    const data = await getActivities();
    setList(data);
  }

  function openAddModal() {
    setEditItem(null);
    setType("running");
    setDuration("30");
    setDistance("1");
    setModalVisible(true);
  }

  function openEditModal(item: ActivityEntry) {
    setEditItem(item);
    setType(item.type);
    setDuration(String(item.duration));
    setDistance(String(item.distance || "0"));
    setModalVisible(true);
  }

  async function onSave() {
    const calories = calculateCalories(type, parseInt(duration));

    const entry: ActivityEntry = editItem
      ? {
          ...editItem,
          type,
          duration: parseInt(duration),
          distance: parseFloat(distance),
          calories,
        }
      : {
          id: String(uuid.v4()),
          type,
          duration: parseInt(duration),
          distance: parseFloat(distance),
          calories,
          date: new Date().toISOString(),
        };

    if (editItem) await updateActivity(entry);
    else await saveActivity(entry);

    setModalVisible(false);
    loadList();
  }

  async function onDelete(id: string) {
    await deleteActivity(id);
    loadList();
  }

  const activityLabels = {
    running: "Running 🏃",
    walking: "Walking 🚶",
    cycling: "Cycling 🚴",
    yoga: "Yoga 🧘",
    gym: "Gym 💪",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Log</Text>

      <ScrollView>
        {list.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => openEditModal(item)}
          >
            <Text style={styles.cardTitle}>{activityLabels[item.type]}</Text>
            <Text style={styles.cardText}>
              {item.duration} mins • {item.calories} kcal
            </Text>
            {item.distance ? (
              <Text style={styles.cardSub}>
                Distance: {item.distance} km
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.delete}
              onPress={() => onDelete(item.id)}
            >
              <Ionicons name="trash-outline" size={20} color="#B00020" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.addText}>+ Add Activity</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {editItem ? "Edit Activity" : "Add Activity"}
            </Text>

            <Text style={styles.label}>Type</Text>
            <View style={styles.typeRow}>
              {(["running", "walking", "cycling", "yoga", "gym"] as ActivityType[]).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeButton, type === t && styles.typeSelected]}
                  onPress={() => setType(t)}
                >
                  <Text style={styles.typeText}>{activityLabels[t]}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Duration (mins)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />

            <Text style={styles.label}>Distance (km)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={distance}
              onChangeText={setDistance}
            />

            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveText}>{editItem ? "Update" : "Save"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: "#F5F5F5" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    position: "relative",
  },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardText: { fontSize: 16, marginTop: 6 },
  cardSub: { fontSize: 14, color: "#666" },

  delete: { position: "absolute", right: 16, top: 16 },

  addButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  addText: { color: "#fff", fontSize: 18, fontWeight: "700" },

  modalContainer: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 16 },

  label: { fontSize: 16, marginTop: 10 },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
  },

  typeRow: { flexDirection: "column", marginTop: 8 },
  typeButton: {
    padding: 10,
    marginBottom: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  typeSelected: { backgroundColor: "#4CAF50" },
  typeText: { fontSize: 16, color: "#333" },

  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 18, fontWeight: "700" },

  cancelButton: { marginTop: 10, alignItems: "center" },
  cancelText: { fontSize: 16, color: "#B00020" },
});

