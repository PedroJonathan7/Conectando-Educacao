import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';

export default function PerfilScreen({ navigation }) {
  const { user } = useContext(UserContext);

  const sair = () => {
    Alert.alert('Sair', 'Você saiu da conta.');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Aluno</Text>

      <View style={styles.card}>
        <Text>Nome: {user?.nome || '---'}</Text>
        <Text>Email: {user?.email || '---'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={sair}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6ddff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3e2f7a' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: '#6b5ca5', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});
