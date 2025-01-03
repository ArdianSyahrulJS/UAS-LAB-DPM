import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Portal, Dialog, Paragraph, Button as PaperButton } from "react-native-paper";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/api";
import { setAuthToken } from "../utils/auth";
import { AuthResponse, ApiError } from "../types";

type RootStackParamList = {
  MainTabs: undefined;
  Register: undefined;
};

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setDialogMessage("Please fill in all fields");
      setVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = (await login(username, password)) as AuthResponse;
      await setAuthToken(response.data.token);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error: any) {
      const apiError = error as ApiError;
      const errorMessage = apiError.data?.message || "Something went wrong";
      const errors = apiError.data?.errors;
      const passwordError = errors?.password;
      const usernameError = errors?.username;
      setDialogMessage(
        passwordError
          ? `${errorMessage}: ${passwordError}`
          : usernameError
          ? `${errorMessage}: ${usernameError}`
          : errorMessage
      );
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#8a7d72"
        style={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#8a7d72"
        style={styles.input}
      />
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
        style={styles.button}
      />
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={() => setVisible(false)}>OK</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5ebe0", // Modern soft brown background
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#7a5c58", // Modern soft brown for text
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#fdf6f0", // Lighter brown for input background
    color: "#7a5c58", // Modern soft brown for text
    marginBottom: 15,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#d7c8b5",
    elevation: 2, // Slight shadow for depth
  },
  button: {
    backgroundColor: "#c7a89e", // Button with modern soft brown tone
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
    elevation: 3, // Button shadow
  },
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#8a7d72", // Softer complementary brown
    fontWeight: "600",
    fontSize: 14,
  },
});

export default LoginScreen;
