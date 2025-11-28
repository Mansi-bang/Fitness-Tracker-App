import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    alert("Logged out — restart the app.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>user@example.com</Text>
      </View>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15 },
  card: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  label: { color: "#777" },
  value: { fontSize: 18, fontWeight: "600", marginTop: 6 },
  logout: { backgroundColor: "#ff4d4d", padding: 14, borderRadius: 12 },
  logoutText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
