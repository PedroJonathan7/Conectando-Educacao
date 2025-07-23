import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
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
          <Text style={styles.cardDesc}>{modulo.descricao}</Text>
        </View>
      ))}

      {modulos.length === 0 && (
        <Text style={styles.emptyText}>Nenhum conteúdo disponível ainda.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a5d8f', // fundo azul escuro
    padding: 20,
    flex: 1,
  },
  voltar: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a5d8f',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#333',
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});