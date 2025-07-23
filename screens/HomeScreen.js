import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Conectando Educação</Text>

      <Text style={styles.subtitle}>Seus cursos:</Text>

      <View style={styles.cardGroup}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Matematica')}>
          <Text style={styles.cardTitle}>MATEMÁTICA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Portugues')}>
          <Text style={styles.cardTitle}>PORTUGUÊS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Informatica')}>
          <Text style={styles.cardTitle}>INFORMÁTICA</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate('AcoesAluno')}>
        <Text style={styles.botaoTexto}>Ações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a5d8f', // fundo azul escuro
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // texto branco
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#fff', // texto branco
    textAlign: 'center',
  },
  cardGroup: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#3399cc', // azul claro
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // texto branco para contraste
  },
  botaoAcao: {
    backgroundColor: '#3399cc', // azul claro no botão
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  botaoTexto: {
    color: '#fff', // texto branco no botão
    fontWeight: 'bold',
    fontSize: 16,
  },
});