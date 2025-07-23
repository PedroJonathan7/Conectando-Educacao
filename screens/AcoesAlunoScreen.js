import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

export default function AcoesAlunoScreen({ navigation }) {
  const [acoes, setAcoes] = useState([]);

  useEffect(() => {
    const acoesRef = ref(database, 'acoes/');
    const unsubscribe = onValue(acoesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.values(data);
        setAcoes(lista);
      } else {
        setAcoes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Ações Disponíveis</Text>

      {acoes.map((acao, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.tituloAcao}>{acao.titulo}</Text>
          <Text style={styles.descricao}>{acao.descricao}</Text>
          <Text style={styles.data}>Data: {acao.data}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2a5d8f',
    flexGrow: 1,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    backgroundColor: '#3399cc',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    width: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tituloAcao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a5d8f',
    marginBottom: 8,
  },
  descricao: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  data: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
});