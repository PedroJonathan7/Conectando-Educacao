import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { ref, set, get } from "firebase/database";
import { database } from "../firebaseConfig";

export default function CadastroProfessor({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [disciplina, setDisciplina] = useState("");

  const handleCadastro = async () => {
    const userKey = nome.trim().toLowerCase();

    if (
      !userKey ||
      !email.trim() ||
      !senha ||
      senha !== confirmarSenha ||
      !disciplina.trim()
    ) {
      Alert.alert("Erro", "Preencha todos os campos corretamente.");
      return;
    }

    const profRef = ref(database, `professores/${userKey}`);
    const snapshot = await get(profRef);

    if (snapshot.exists()) {
      Alert.alert("Erro", "Professor já cadastrado.");
      return;
    }

    await set(profRef, {
      nome: nome.trim(),
      email: email.trim(),
      senha,
      disciplina: disciplina.trim(),
      tipo: "professor",
    });

    Alert.alert("Sucesso", "Cadastro realizado!");
    navigation.navigate("LoginProfessor");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <View style={styles.inputGroup}>
        <Image source={require("../assets/user-icon.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputGroup}>
        <Image source={require("../assets/email-icon.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#666"
        />
      </View>


      <View style={styles.inputGroup}>
        <Image source={require("../assets/lock-icon.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputGroup}>
        <Image source={require("../assets/lock-icon.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholderTextColor="#666"
        />
      </View>

      <TouchableOpacity style={styles.botaoCadastro} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar Professor</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginProfessor")}>
        <Text style={styles.linkText}>Já tem conta? Fazer login</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>conectando educação-PE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a5d8f",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 30,
    resizeMode: "contain",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: "100%",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#000",
  },
  botaoCadastro: {
    backgroundColor: "#3399cc",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  linkText: {
    marginTop: 15,
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
  },
});