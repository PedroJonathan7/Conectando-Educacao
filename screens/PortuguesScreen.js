import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function PortuguesScreen({ navigation }) {
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    const carregarModulos = async () => {
      try {
        const refModulos = ref(database, 'cursos/Portugues/modulos');
        const snapshot = await get(refModulos);
        if (snapshot.exists()) {
          const dados = snapshot.val();
          const lista = Object.entries(dados).map(([key, val]) => ({ id: key, ...val }));
          setModulos(lista);
        } else {
          setModulos([]);
        }
      } catch (error) {
        console.error('Erro ao carregar módulos de Português:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    };

    carregarModulos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Curso de Português</Text>

      {modulos.map((modulo) => (
        <View key={modulo.id} style={styles.card}>
          <Text style={styles.cardTitle}>{modulo.titulo}</Text>
          <Text style={styles.cardDesc}>{modulo.descricao}</Text>
        </View>
      ))}

      {modulos.length === 0 && (
        <Text style={styles.emptyText}>Nenhum conteúdo adicionado ainda.</Text>
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
    color: '#fff',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#3399cc', // azul claro para o card
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
    color: '#fff',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#e6ddff',
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});