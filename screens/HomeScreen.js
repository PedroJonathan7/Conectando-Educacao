import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Conectando Educação</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seus cursos:</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Curso')}>
          <Text style={styles.buttonText}>Ver cursos disponíveis</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destaques:</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔢 Matemática</Text>
          <Text>Aulas de frações, porcentagem e mais!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Matematica')}>
            <Text style={styles.link}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 Português</Text>
          <Text>Ortografia, interpretação e redação.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Portugues')}>
            <Text style={styles.link}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>💻 Informática</Text>
          <Text>Pacote Office, navegação segura e mais.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Informatica')}>
            <Text style={styles.link}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#e6ddff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3e2f7a' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { fontWeight: 'bold', marginBottom: 5 },
  button: { backgroundColor: '#6b5ca5', padding: 10, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center' },
  link: { color: '#6b5ca5', marginTop: 5 },
});
