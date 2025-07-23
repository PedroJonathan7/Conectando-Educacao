import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../firebaseConfig';

const COLORS = {
  background: '#2a5d8f',
  primaryText: '#ffffff',
  itemBackground: '#3399cc',
  emailText: '#e0e0e0',
  loadingIndicator: '#3399cc',
};

export default function ChatScreen({ navigation }) {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const professoresRef = ref(database, 'professores/');
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaProfessores = Object.keys(data).map(key => ({
          id: key,
          nome: data[key].nome,
          email: data[key].email,
        }));
        setProfessores(listaProfessores);
      }
      setLoading(false);
    };
    onValue(professoresRef, handleData);
    return () => off(professoresRef);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.loadingIndicator} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um Professor</Text>
      <FlatList
        data={professores}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('ChatConversa', { professorId: item.id })}
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
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: COLORS.primaryText },
  item: { 
    backgroundColor: COLORS.itemBackground, 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10,
    elevation: 2,
  },
  nome: { fontWeight: 'bold', color: COLORS.primaryText, fontSize: 16 },
  email: { color: COLORS.emailText, marginTop: 5, fontSize: 14 }
});