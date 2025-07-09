import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Alert, StyleSheet
} from 'react-native';
import { ref, get, push, remove } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function EditarAcoesScreen({ navigation }) {
  const [acoes, setAcoes] = useState([]);
  const [novaAcao, setNovaAcao] = useState('');

  useEffect(() => {
    carregarAcoes();
  }, []);

  const carregarAcoes = async () => {
    try {
      const acoesRef = ref(database, 'acoes/');
      const snapshot = await get(acoesRef);
      if (snapshot.exists()) {
        const dados = snapshot.val();
        const lista = Object.keys(dados).map((key) => ({
          id: key,
          texto: dados[key].texto
        }));
        setAcoes(lista);
      } else {
        setAcoes([]);
      }
    } catch (error) {
      console.error('Erro ao carregar ações:', error);
      Alert.alert('Erro', 'Não foi possível carregar as ações.');
    }
  };

  const adicionarAcao = async () => {
    if (!novaAcao.trim()) {
      Alert.alert('Erro', 'Digite uma ação.');
      return;
    }

    try {
      const novaRef = ref(database, 'acoes/');
      await push(novaRef, { texto: novaAcao.trim() });
      setNovaAcao('');
      carregarAcoes();
    } catch (error) {
      console.error('Erro ao adicionar ação:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a ação.');
    }
  };

  const deletarAcao = async (id) => {
    try {
      const acaoRef = ref(database, `acoes/${id}`);
      await remove(acaoRef);
      carregarAcoes();
    } catch (error) {
      console.error('Erro ao deletar ação:', error);
      Alert.alert('Erro', 'Não foi possível deletar a ação.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Editar Ações</Text>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Nova ação"
          value={novaAcao}
          onChangeText={setNovaAcao}
        />
        <TouchableOpacity style={styles.button} onPress={adicionarAcao}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {acoes.map((acao) => (
        <View key={acao.id} style={styles.card}>
          <Text style={styles.texto}>{acao.texto}</Text>
          <TouchableOpacity style={styles.deletarBtn} onPress={() => deletarAcao(acao.id)}>
            <Text style={styles.deletarTexto}>Excluir</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6ddff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3e2f7a' },
  inputGroup: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#6b5ca5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  texto: { fontSize: 16, color: '#333' },
  deletarBtn: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  deletarTexto: {
    color: '#b00020',
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#3e2f7a',
    fontSize: 16,
  },
});
