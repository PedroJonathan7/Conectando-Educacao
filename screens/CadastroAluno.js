import React, { useState } from 'react';
import {
  View, TextInput, Text, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import { ref, set, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function CadastroAluno({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    const userKey = nome.trim().toLowerCase();

    if (!userKey || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const alunoRef = ref(database, `alunos/${userKey}`);
      const snapshot = await get(alunoRef);

      if (snapshot.exists()) {
        Alert.alert('Erro', 'Usuário já existe!');
        return;
      }

      await set(alunoRef, {
        nome: userKey,
        senha: senha
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Falha ao salvar no banco de dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já tem conta? Faça login</Text>
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
