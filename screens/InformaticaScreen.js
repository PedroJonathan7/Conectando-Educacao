import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function InformaticaScreen({ navigation }) {
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    const carregarModulos = async () => {
      try {
        const refModulos = ref(database, 'cursos/Informatica/modulos');
        const snapshot = await get(refModulos);
        if (snapshot.exists()) {
          const dados = snapshot.val();
          const lista = Object.entries(dados).map(([key, val]) => ({ id: key, ...val }));
          setModulos(lista);
        }
      } catch (error) {
        console.error('Erro ao carregar módulos de Informática:', error);
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

      <Text style={styles.title}>Curso de Informática</Text>

      {modulos.length === 0 && <Text style={styles.emptyText}>Nenhum conteúdo adicionado ainda.</Text>}

      {modulos.map((modulo) => (
        <View key={modulo.id} style={styles.card}>
          <Text style={styles.cardTitle}>{modulo.titulo}</Text>
          <Text style={styles.cardDescription}>{modulo.descricao}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a5d8f',  // fundo azul escuro
    padding: 20,
    flex: 1,
  },
  voltar: {
    fontSize: 16,
    color: '#3399cc', // azul claro para contraste
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff', // branco para destacar no fundo azul escuro
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#3399cc', // azul claro nos cards
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#fff',  // branco para contraste
    marginBottom: 5,
    fontSize: 16,
  },
  cardDescription: {
    color: '#e0e0e0', // texto clarinho no card azul claro
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#fff',  // texto branco no fundo azul escuro
  },
});