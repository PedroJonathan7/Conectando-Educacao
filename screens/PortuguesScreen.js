import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function PortuguesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Curso de Português</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 1: Ortografia</Text>
        <Text>Regras de acentuação, grafia e letras.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 2: Gramática</Text>
        <Text>Verbos, substantivos, adjetivos e mais.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 3: Interpretação de Texto</Text>
        <Text>Textos narrativos, descritivos, informativos.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 4: Redação</Text>
        <Text>Coesão, coerência e estrutura textual.</Text>
      </View>

      <TouchableOpacity onPress={() => alert('Material de Português em breve')} style={styles.button}>
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
