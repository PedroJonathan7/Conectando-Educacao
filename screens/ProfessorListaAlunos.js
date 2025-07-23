import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  background: '#2a5d8f',
  primaryText: '#fff',
  itemBackground: '#3399cc',
  secondaryText: '#ddd',
};

export default function ChatListaProfessores() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const profRef = ref(database, 'professores/');
    const onData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map(key => ({
          id: key,
          nome: data[key].nome,
          email: data[key].email,
        }));
        setProfessores(lista);
      }
      setLoading(false);
    };
    onValue(profRef, onData);
    return () => off(profRef);
  }, []);

  if (loading) return (
    <View style={[styles.container, {justifyContent:'center', alignItems:'center'}]}>
      <ActivityIndicator size="large" color={COLORS.itemBackground} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professores disponíveis</Text>
      <FlatList
        data={professores}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('ChatAluno', { professorId: item.id })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: COLORS.background, padding: 20 },
  title: { color: COLORS.primaryText, fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: {
    backgroundColor: COLORS.itemBackground,
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },
  nome: {
    color: COLORS.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
  },
  email: {
    color: COLORS.secondaryText,
    marginTop: 4,
    fontSize: 14,
  }
});