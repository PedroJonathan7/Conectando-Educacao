import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function AcoesScreen({ navigation }) {
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  const salvarAcao = () => {
    if (!local || !descricao || !data) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    Alert.alert('Sucesso', 'Ação salva com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Nova Ação</Text>

      <TextInput
        style={styles.input}
        placeholder="Local da ação"
        value={local}
        onChangeText={setLocal}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da ação"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Data da ação"
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity style={styles.botao} onPress={salvarAcao}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#e6ddff', flex: 1, padding: 20 },
  voltar: { color: '#6b5ca5', marginBottom: 10 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#3e2f7a' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#6b5ca5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
