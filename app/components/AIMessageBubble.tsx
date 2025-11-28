import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  message: string;
  isUser?: boolean;
}

export default function AIMessageBubble({ message, isUser = false }: Props) {
  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={isUser ? styles.userText : styles.aiText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "80%",
    padding: 14,
    marginVertical: 8,
    borderRadius: 18,
  },
  aiBubble: {
    backgroundColor: "#ECEFF8",
    alignSelf: "flex-start",
  },
  userBubble: {
    backgroundColor: "#4E6EF2",
    alignSelf: "flex-end",
  },
  aiText: {
    color: "#333",
  },
  userText: {
    color: "#fff",
  },
});
