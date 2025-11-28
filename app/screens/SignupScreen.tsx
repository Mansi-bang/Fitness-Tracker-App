import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

export default function SignupScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await AsyncStorage.setItem("user", JSON.stringify({ email, password }));
    Alert.alert("Account Created", "You can now login.");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account 🏋️</Text>

      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: { padding: 14, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: "#4E6EF2", padding: 14, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  link: { marginTop: 15, color: "#4E6EF2", textAlign: "center" },
});
