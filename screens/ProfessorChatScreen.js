import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export default function ProfessorChatScreen() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore, "messages"),
      where("participants", "array-contains", "PROFESSOR_ID")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
        });
      });
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6b5ca5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chat com Alunos</Text>

      {messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text>{item.text}</Text>
              <Text style={styles.time}>
                {item.timestamp?.toLocaleTimeString()}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noMessages}>Nenhuma mensagem encontrada</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3e2f7a",
  },
  messageContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  noMessages: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
