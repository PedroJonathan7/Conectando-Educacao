import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
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
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <Image source={require('../assets/user-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/lock-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.rowLinks}>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroProfessor')}>
          <Text style={styles.linkText}>cadastrar professor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroAluno')}>
          <Text style={styles.linkText}>cadastrar aluno</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
        <Text style={styles.linkText}>Esqueci a senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginProfessor')}>
        <Text style={styles.linkText}>Sou Professor</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>conectando educação-PE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3598AC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: '100%',
    height: 50,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 50,
    alignItems: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rowLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#f6f0e5',
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  footerText: {
    fontFamily: 'cursive',
    fontSize: 16,
  },
});
