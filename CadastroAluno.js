import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, set } from 'firebase/database';

export default function CadastroAluno({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrarAluno = async () => {
    if (!nome || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const alunoRef = ref(database, 'alunos/' + nome);
    try {
      await set(alunoRef, {
        nome,
        senha,
      });
      Alert.alert('Aluno cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao cadastrar.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome do aluno" onChangeText={setNome} value={nome} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setSenha} value={senha} />
      <Button title="Cadastrar Aluno" onPress={cadastrarAluno} />
    </View>
  );
}
