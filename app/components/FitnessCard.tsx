import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {
  title: string;
  value: string;
  image?: string;
}

export default function FitnessCard({ title, value, image }: Props) {
  return (
    <View style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.img} />}

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  img: {
    width: 55,
    height: 55,
    borderRadius: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    color: "#666",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
  },
});
