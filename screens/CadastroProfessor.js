// screens/CadastroProfessor.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { ref, set, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function CadastroProfessor({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    const userKey = nome.trim().toLowerCase();

    if (!userKey || !email || !senha || senha !== confirmarSenha) {
      Alert.alert('Erro', 'Verifique os campos.');
      return;
    }

    const profRef = ref(database, `professores/${userKey}`);
    const snapshot = await get(profRef);

    if (snapshot.exists()) {
      Alert.alert('Erro', 'Professor já cadastrado.');
      return;
    }

    await set(profRef, { nome: userKey, email: email.trim(), senha });
    Alert.alert('Sucesso', 'Cadastro realizado!');
    navigation.navigate('LoginProfessor');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Professor</Text>

      <TextInput style={styles.input} placeholder="Nome de usuário" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginProfessor')}>
        <Text style={styles.linkText}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#c7b3ff', justifyContent: 'center', paddingHorizontal: 25 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#3e2f7a', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#e6e0ff', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#6b5ca5', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  linkText: { marginTop: 15, textAlign: 'center', color: '#3e2f7a' },
});
