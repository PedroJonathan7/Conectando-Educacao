import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
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

      {/* Campo de email */}
      <View style={styles.inputContainer}>
        <Image source={require('../assets/user-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#333"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Campo de senha */}
      <View style={styles.inputContainer}>
        <Image source={require('../assets/lock-icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#333"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      {/* Botão de login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Links de navegação */}
      <View style={styles.rowLinks}>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroProfessor')}>
          <Text style={styles.linkText}>Cadastrar Professor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroAluno')}>
          <Text style={styles.linkText}>Cadastrar Aluno</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
        <Text style={styles.linkText}>Esqueci a senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginProfessor')}>
        <Text style={styles.linkText}>Sou Professor</Text>
      </TouchableOpacity>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>conectando educação - PE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a5d8f', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 25,
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
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#3399cc', // azul claro
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  rowLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  footerText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#ddd',
  },
});