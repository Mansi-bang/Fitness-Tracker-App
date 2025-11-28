import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Steps</Text>

      <LineChart
        width={Dimensions.get("window").width - 30}
        height={220}
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ data: [4200, 5300, 4800, 6100, 7000, 8200, 9000] }],
        }}
        chartConfig={{
          backgroundColor: "#fff",
          color: () => "#4E6EF2",
        }}
        style={{ borderRadius: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
});
