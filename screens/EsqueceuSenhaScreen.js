import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet
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
      const alunosRef = ref(database, 'alunos/');
      const snapshotAlunos = await get(alunosRef);
      let usuarioEncontrado = null;
      let userId = null;
      let tipoUsuario = null;

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
      <Image
        source={require('../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <Image source={require('../assets/user-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#333"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/lock-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#333"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
        <Text style={styles.buttonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Voltar ao Login</Text>
      </TouchableOpacity>

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>conectando educação - PE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3399cc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    height: 50,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#000',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#ffffff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  rodape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#fdf5e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rodapeTexto: {
    fontStyle: 'italic',
    color: '#444',
    fontSize: 16,
  },
});
