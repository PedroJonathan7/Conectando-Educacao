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

      <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate('Acoes')}>
        <Text style={styles.botaoTexto}>Adicionar Ação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#87b4d9', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
  subtitle: { fontSize: 18, marginVertical: 10, color: '#fff' },
  cardGroup: { marginBottom: 20 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#2f4f4f' },
  botaoAcao: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#2f4f4f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
