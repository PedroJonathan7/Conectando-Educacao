import React, { useState, useContext } from 'react';
import {
  View, TextInput, Text, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import { get, ref } from 'firebase/database';
import { database } from '../firebaseConfig';
import { UserContext } from '../contexts/UserContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    const emailKey = email.trim().toLowerCase();
    const senhaKey = senha;

    if (!emailKey || !senhaKey) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const alunosRef = ref(database, 'alunos/');
      const snapshot = await get(alunosRef);

      if (!snapshot.exists()) {
        Alert.alert('Erro', 'Nenhum aluno cadastrado.');
        return;
      }

      const alunos = snapshot.val();
      let usuarioEncontrado = null;
      let userKey = null;

      for (const key in alunos) {
        const aluno = alunos[key];
        if (aluno.email === emailKey && aluno.senha === senhaKey) {
          usuarioEncontrado = aluno;
          userKey = key;
          break;
        }
      }

      if (usuarioEncontrado) {
        setUser({ nome: userKey, email: usuarioEncontrado.email });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Erro', 'E-mail ou senha inválidos.');
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
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
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

      <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
        <Text style={styles.linkText}>Esqueceu sua senha?</Text>
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
