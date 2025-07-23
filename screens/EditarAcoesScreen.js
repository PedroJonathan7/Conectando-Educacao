import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Alert, StyleSheet
} from 'react-native';
import { ref, get, push, remove } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function EditarAcoesScreen({ navigation }) {
  const [acoes, setAcoes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

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
          titulo: dados[key].titulo,
          descricao: dados[key].descricao,
          data: dados[key].data,
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
    if (!titulo.trim() || !descricao.trim() || !data.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const novaRef = ref(database, 'acoes/');
      await push(novaRef, {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        data: data.trim(),
      });

      setTitulo('');
      setDescricao('');
      setData('');
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Editar Ações</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da ação"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (ex: 25/07/2025)"
        value={data}
        onChangeText={setData}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarAcao}>
        <Text style={styles.buttonText}>Adicionar Ação</Text>
      </TouchableOpacity>

      {acoes.map((acao) => (
        <View key={acao.id} style={styles.card}>
          <Text style={styles.texto}><Text style={styles.label}>Título:</Text> {acao.titulo}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Descrição:</Text> {acao.descricao}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Data:</Text> {acao.data}</Text>
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
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#6b5ca5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  texto: { fontSize: 16, color: '#333', marginBottom: 4 },
  label: { fontWeight: 'bold', color: '#3e2f7a' },
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
