import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function InformaticaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Curso de Informática</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 1: Conceitos Básicos</Text>
        <Text>Componentes, SO e funções essenciais.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 2: Pacote Office</Text>
        <Text>Word, Excel, PowerPoint: criação e edição.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 3: Internet Segura</Text>
        <Text>Segurança de dados e navegação responsável.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 4: Apps Educacionais</Text>
        <Text>Ferramentas para estudos online.</Text>
      </View>

      <TouchableOpacity onPress={() => alert('Material de Informática em breve')} style={styles.button}>
        <Text style={styles.buttonText}>Ver Material Completo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#e6ddff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#3e2f7a' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { fontWeight: 'bold', marginBottom: 5 },
  button: { backgroundColor: '#6b5ca5', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});
