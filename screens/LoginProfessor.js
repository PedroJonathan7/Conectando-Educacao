import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
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
          routes: [{ name: 'HomeProfessor' }],
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
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.inputGroup}>
        <Image source={require('../assets/email-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Image source={require('../assets/lock-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity style={styles.botaoLogin} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroProfessor')}>
        <Text style={styles.linkText}>Cadastrar professor</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Voltar para login de aluno</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>conectando educação-PE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3598af',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 30,
    resizeMode: 'contain'
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: '100%'
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  input: {
    flex: 1,
    height: 50
  },
  botaoLogin: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000'
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  linkText: {
  marginTop: 15,
  color: '#fff',
  textDecorationLine: 'underline',
  fontSize: 14,
  textAlign: 'center'
},
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic'
  }
});
