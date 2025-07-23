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
      {/* Botão de voltar */}
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
    backgroundColor: '#3498a5',
    flexGrow: 1,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    width: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tituloAcao: {
    fontSize: 18,
    fontWeight: '600',
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
