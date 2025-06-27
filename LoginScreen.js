import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = async () => {
    try {
      const usuarioRef = ref(database, 'alunos/' + usuario);
      const snapshot = await get(usuarioRef);

      if (snapshot.exists()) {
        const dados = snapshot.val();
        if (dados.senha === senha) {
          Alert.alert('Login realizado com sucesso!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Senha incorreta!');
        }
      } else {
        Alert.alert('Usuário não encontrado!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao fazer login.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Usuário" onChangeText={setUsuario} value={usuario} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setSenha} value={senha} />
      <Button title="Login" onPress={fazerLogin} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('CadastroAluno')} />
    </View>
  );
}
