import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function MatematicaScreen({ navigation }) {
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(database, 'cursos/Matematica/modulos'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const lista = Object.values(data);
          setModulos(lista);
        } else {
          setModulos([]);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de Matemática:', error);
        Alert.alert('Erro', 'Falha ao carregar o curso.');
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Curso de Matemática</Text>

      {modulos.map((modulo, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{modulo.titulo}</Text>
          <Text>{modulo.descricao}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#e6ddff', padding: 20 },
  voltar: { fontSize: 16, color: '#6b5ca5', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#3e2f7a' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { fontWeight: 'bold', marginBottom: 5 },
  button: { backgroundColor: '#6b5ca5', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});
