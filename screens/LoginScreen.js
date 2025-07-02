import React, { useState } from 'react';
import {
  View, TextInput, Text, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import { get, ref } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const userKey = usuario.trim().toLowerCase();

    if (!userKey || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const userRef = ref(database, `alunos/${userKey}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      const dados = snapshot.val();
      if (dados.senha === senha) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Erro', 'Senha incorreta.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Falha ao acessar o banco.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroAluno')}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#c7b3ff', justifyContent: 'center', paddingHorizontal: 25 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#3e2f7a', marginBottom: 30, alignSelf: 'center' },
  input: { backgroundColor: '#e6e0ff', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#6b5ca5', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  linkText: { marginTop: 15, textAlign: 'center', color: '#3e2f7a' },
});
