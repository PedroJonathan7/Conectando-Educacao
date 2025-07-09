import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { ref, get, update } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function EditarCursosScreen({ navigation }) {
  const [cursos, setCursos] = useState({
    Matematica: '',
    Portugues: '',
    Informatica: ''
  });

  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    try {
      const cursosRef = ref(database, 'cursos/');
      const snapshot = await get(cursosRef);
      if (snapshot.exists()) {
        setCursos(snapshot.val());
      }
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os cursos.');
    }
  };

  const salvarAlteracoes = async () => {
    try {
      await update(ref(database, 'cursos/'), cursos);
      Alert.alert('Sucesso', 'Cursos atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar cursos:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando cursos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Editar Conteúdo dos Cursos</Text>

      {Object.entries(cursos).map(([curso, texto]) => (
        <View key={curso} style={styles.card}>
          <Text style={styles.label}>{curso}</Text>
          <TextInput
            multiline
            style={styles.input}
            value={texto}
            onChangeText={(novoTexto) =>
              setCursos((prev) => ({ ...prev, [curso]: novoTexto }))
            }
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6ddff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3e2f7a' },
  card: { marginBottom: 20 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#3e2f7a' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#6b5ca5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#3e2f7a',
    fontSize: 16,
  }
});
