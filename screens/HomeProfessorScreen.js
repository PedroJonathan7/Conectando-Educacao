import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeProfessorScreen() {
  const navigation = useNavigation();

  const editarCurso = (curso) => {
    navigation.navigate('EditarCursos', { curso });
  };

  const editarAcoes = () => {
    navigation.navigate('EditarAcoes');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo, Professor</Text>

      <Text style={styles.subtitle}>Gerenciar Conteúdos:</Text>

      <View style={styles.cardGroup}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => editarCurso('Matematica')}
        >
          <Text style={styles.cardTitle}>MATEMÁTICA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => editarCurso('Portugues')}
        >
          <Text style={styles.cardTitle}>PORTUGUÊS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => editarCurso('Informatica')}
        >
          <Text style={styles.cardTitle}>INFORMÁTICA</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoAcao} onPress={editarAcoes}>
        <Text style={styles.botaoTexto}>Ações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#c7b3ff', padding: 20 },
  voltar: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  voltarTexto: { color: '#3e2f7a', fontWeight: 'bold' },
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