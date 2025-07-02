import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function MatematicaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Curso de Matemática</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 1: Operações Básicas</Text>
        <Text>Soma, subtração, multiplicação e divisão.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 2: Frações</Text>
        <Text>Numeradores, denominadores, somas de frações.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 3: Porcentagem</Text>
        <Text>Descontos, acréscimos e mais.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo 4: Geometria</Text>
        <Text>Figuras, perímetro, área e volume.</Text>
      </View>

      <TouchableOpacity onPress={() => alert('Material em breve')} style={styles.button}>
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
