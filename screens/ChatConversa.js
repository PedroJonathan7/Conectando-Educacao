import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function ChatConversa({ route }) {
  const { sender, receiver } = route.params;
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);

  const chatId = [sender, receiver].sort().join('_');
  const chatRef = ref(database, `chats/${chatId}`);

  useEffect(() => {
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const dados = snapshot.val();
      if (dados) {
        const lista = Object.values(dados);
        setMensagens(lista.sort((a, b) => a.timestamp - b.timestamp));
      } else {
        setMensagens([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const enviarMensagem = async () => {
    if (mensagem.trim() === '') return;

    const novaMensagem = {
      remetente: sender,
      texto: mensagem.trim(),
      timestamp: Date.now(),
    };

    try {
      await push(chatRef, novaMensagem);
      setMensagem('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.mensagem,
        item.remetente === sender ? styles.eu : styles.eles,
      ]}
    >
      <Text style={styles.texto}>{item.texto}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={mensagens}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        style={styles.lista}
        inverted
        contentContainerStyle={{ flexDirection: 'column-reverse' }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity style={styles.botao} onPress={enviarMensagem}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
        
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6fc',
  },
  lista: {
    flex: 1,
    padding: 10,
  },
  mensagem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: '80%',
  },
  eu: {
    backgroundColor: '#3399cc',
    alignSelf: 'flex-end',
  },
  eles: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
  texto: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  botao: {
    marginLeft: 10,
    backgroundColor: '#2a5d8f',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});