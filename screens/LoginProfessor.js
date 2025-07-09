import React, { useState, useContext } from 'react';
import {
  View, TextInput, Text, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import { get, ref } from 'firebase/database';
import { database } from '../firebaseConfig';
import { UserContext } from '../contexts/UserContext';

export default function LoginProfessor({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    const emailKey = email.trim().toLowerCase();

    if (!emailKey || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const professoresRef = ref(database, 'professores/');
      const snapshot = await get(professoresRef);

      if (!snapshot.exists()) {
        Alert.alert('Erro', 'Nenhum professor cadastrado.');
        return;
      }

      const professores = snapshot.val();
      let professorEncontrado = null;
      let key = null;

      for (const k in professores) {
        const prof = professores[k];
        if (prof.email === emailKey && prof.senha === senha) {
          professorEncontrado = prof;
          key = k;
          break;
        }
      }

      if (professorEncontrado) {
        setUser({ nome: key, email: professorEncontrado.email });
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeProfessor' }], // <- ALTERADO AQUI
        });
      } else {
        Alert.alert('Erro', 'E-mail ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro no login do professor:', error);
      Alert.alert('Erro', 'Falha ao acessar o banco.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login do Professor</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail do professor"
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

      <TouchableOpacity onPress={() => navigation.navigate('CadastroProfessor')}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Voltar para login de aluno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#c7b3ff', justifyContent: 'center', paddingHorizontal: 25 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#3e2f7a', marginBottom: 25, alignSelf: 'center' },
  input: { backgroundColor: '#e6e0ff', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#6b5ca5', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  linkText: { marginTop: 15, textAlign: 'center', color: '#3e2f7a' },
});
