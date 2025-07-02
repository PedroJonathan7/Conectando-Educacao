import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CursoScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Escolha o curso que deseja acessar</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Matemática</Text>
        <Text>Aulas de aritmética, frações, porcentagem, geometria e mais.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Matematica')}>
          <Text style={styles.link}>Acessar Matemática</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Português</Text>
        <Text>Ortografia, gramática, interpretação de texto e redação.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Portugues')}>
          <Text style={styles.link}>Acessar Português</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informática</Text>
        <Text>Conceitos básicos, navegação segura, pacote Office e mais.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Informatica')}>
          <Text style={styles.link}>Acessar Informática</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#e6ddff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#3e2f7a' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20 },
  cardTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 },
  link: { color: '#6b5ca5', marginTop: 8 },
});
