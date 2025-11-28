import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ChartCard({ title, children }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.chartWrap}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10
  },
  chartWrap: {
    borderRadius: 12,
    overflow: "hidden"
  }
});
