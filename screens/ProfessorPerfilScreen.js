import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";

export default function ProfessorPerfilScreen({ navigation }) {
  const { user } = useContext(UserContext);

  const sair = () => {
    Alert.alert("Sair", "Você saiu da conta.");
    navigation.reset({ index: 0, routes: [{ name: "LoginProfessor" }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Professor</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user?.nome || "---"}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || "---"}</Text>

        <Text style={styles.label}>Disciplina:</Text>
        <Text style={styles.value}>{user?.disciplina || "---"}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={sair}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ddff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3e2f7a",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#6b5ca5",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#2f4f4f",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#6b5ca5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
