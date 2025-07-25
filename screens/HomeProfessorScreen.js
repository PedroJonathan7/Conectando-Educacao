import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeProfessorScreen() {
  const navigation = useNavigation();

  const editarCurso = (curso) => {
    navigation.navigate("EditarCursos", { curso });
  };

  const editarAcoes = () => {
    navigation.navigate("EditarAcoes");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo, Professor</Text>

      <Text style={styles.subtitle}>Gerenciar Conteúdos:</Text>

      <View style={styles.cardGroup}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => editarCurso("Matematica")}
        >
          <Text style={styles.cardTitle}>MATEMÁTICA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => editarCurso("Portugues")}
        >
          <Text style={styles.cardTitle}>PORTUGUÊS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => editarCurso("Informatica")}
        >
          <Text style={styles.cardTitle}>INFORMÁTICA</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoAcao} onPress={editarAcoes}>
        <Text style={styles.botaoTexto}>Ações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2a5d8f",  // fundo azul escuro
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",             // texto branco para contraste
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    color: "#fff",             // texto branco
    textAlign: "center",
  },
  cardGroup: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#3399cc",  // azul claro para os cards
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",              // texto branco para contraste no card azul
  },
  botaoAcao: {
    backgroundColor: "#3399cc",  // azul claro no botão
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  botaoTexto: {
    color: "#fff",              // texto branco no botão
    fontWeight: "bold",
    fontSize: 16,
  },
});