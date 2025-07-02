import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet
} from 'react-native';

export default function ChatScreen() {
  const [mensagem, setMensagem] = useState('');
  const [conversas, setConversas] = useState([]);

  const enviarMensagem = () => {
    if (mensagem.trim() === '') return;

    const novaMensagem = {
      id: Date.now().toString(),
      texto: mensagem
    };

    setConversas([...conversas, novaMensagem]);
    setMensagem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat com Educadores</Text>

      <FlatList
        data={conversas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.msgBox}>
            <Text>{item.texto}</Text>
          </View>
        )}
        style={styles.chatArea}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem"
        value={mensagem}
        onChangeText={setMensagem}
      />

      <TouchableOpacity style={styles.button} onPress={enviarMensagem}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6ddff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#3e2f7a' },
  chatArea: { flex: 1, marginBottom: 10 },
  msgBox: { backgroundColor: '#f2f0ff', padding: 10, borderRadius: 8, marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#6b5ca5', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});
