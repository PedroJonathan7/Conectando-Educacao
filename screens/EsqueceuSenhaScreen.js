import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import { ref, get, update } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function EsqueceuSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const handleRecuperar = async () => {
    const emailKey = email.trim().toLowerCase();
    const novaSenhaKey = novaSenha.trim();

    if (!emailKey || !novaSenhaKey) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      // Buscar alunos
      const alunosRef = ref(database, 'alunos/');
      const snapshotAlunos = await get(alunosRef);
      let usuarioEncontrado = null;
      let userId = null;
      let tipoUsuario = null; // 'alunos' ou 'professores'

      if (snapshotAlunos.exists()) {
        const alunos = snapshotAlunos.val();
        for (const key in alunos) {
          if (alunos[key].email === emailKey) {
            usuarioEncontrado = alunos[key];
            userId = key;
            tipoUsuario = 'alunos';
            break;
          }
        }
      }

      // Se não achou nos alunos, busca nos professores
      if (!usuarioEncontrado) {
        const profsRef = ref(database, 'professores/');
        const snapshotProfs = await get(profsRef);
        if (snapshotProfs.exists()) {
          const professores = snapshotProfs.val();
          for (const key in professores) {
            if (professores[key].email === emailKey) {
              usuarioEncontrado = professores[key];
              userId = key;
              tipoUsuario = 'professores';
              break;
            }
          }
        }
      }

      if (usuarioEncontrado && userId && tipoUsuario) {
        // Atualiza a senha no caminho correto
        await update(ref(database, `${tipoUsuario}/${userId}`), {
          senha: novaSenhaKey
        });

        Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'E-mail não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
        <Text style={styles.buttonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Voltar ao Login</Text>
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
  linkText: { marginTop: 20, textAlign: 'center', color: '#3e2f7a' },
});
