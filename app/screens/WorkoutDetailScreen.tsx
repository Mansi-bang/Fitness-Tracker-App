import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WorkoutDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Details</Text>
      <Text style={styles.text}>Type: Running</Text>
      <Text style={styles.text}>Duration: 25 mins</Text>
      <Text style={styles.text}>Calories: 220 kcal</Text>
      <Text style={styles.text}>Distance: 2.3 km</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 18, marginBottom: 10 },
});
