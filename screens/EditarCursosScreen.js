import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { ref, get, push, update, remove } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function EditarCursosScreen({ navigation }) {
  const [cursoSelecionado, setCursoSelecionado] = useState('Matematica');
  const [modulos, setModulos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  // Para edição
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEditando, setTituloEditando] = useState('');
  const [descricaoEditando, setDescricaoEditando] = useState('');

  const carregarModulos = async () => {
    try {
      const modulosRef = ref(database, `cursos/${cursoSelecionado}/modulos`);
      const snapshot = await get(modulosRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const lista = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setModulos(lista);
        console.log('Módulos carregados:', lista);
      } else {
        setModulos([]);
        console.log('Nenhum módulo encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar módulos:', error);
    }
  };

  const adicionarModulo = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      const modulosRef = ref(database, `cursos/${cursoSelecionado}/modulos`);
      await push(modulosRef, { titulo, descricao });
      setTitulo('');
      setDescricao('');
      carregarModulos();
      Alert.alert('Sucesso', 'Módulo adicionado!');
    } catch (error) {
      console.error('Erro ao adicionar módulo:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o módulo.');
    }
  };

  // Iniciar edição
  const iniciarEdicao = (modulo) => {
    setEditandoId(modulo.id);
    setTituloEditando(modulo.titulo);
    setDescricaoEditando(modulo.descricao);
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setTituloEditando('');
    setDescricaoEditando('');
  };

  // Salvar edição
  const salvarEdicao = async () => {
    if (!tituloEditando || !descricaoEditando) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      const moduloRef = ref(database, `cursos/${cursoSelecionado}/modulos/${editandoId}`);
      await update(moduloRef, { titulo: tituloEditando, descricao: descricaoEditando });
      setEditandoId(null);
      setTituloEditando('');
      setDescricaoEditando('');
      carregarModulos();
      Alert.alert('Sucesso', 'Módulo atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar módulo:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o módulo.');
    }
  };

  // Excluir módulo
 const excluirModulo = async (id) => {
  console.log('Tentando excluir módulo id:', id);
  try {
    const moduloRef = ref(database, `cursos/${cursoSelecionado}/modulos/${id}`);
    await remove(moduloRef);
    console.log('Módulo excluído:', id);
    carregarModulos();
    Alert.alert('Sucesso', 'Módulo excluído!');
  } catch (error) {
    console.error('Erro ao excluir módulo:', error);
    Alert.alert('Erro', 'Não foi possível excluir o módulo.');
  }
};

  useEffect(() => {
    carregarModulos();
  }, [cursoSelecionado]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Editar Conteúdo dos Cursos</Text>

      <View style={styles.selectorContainer}>
        {['Matematica', 'Portugues', 'Informatica'].map((curso) => (
          <TouchableOpacity
            key={curso}
            style={[styles.selector, cursoSelecionado === curso && styles.selectorAtivo]}
            onPress={() => setCursoSelecionado(curso)}
          >
            <Text style={[styles.selectorText, cursoSelecionado === curso && {color: '#fff'}]}>{curso}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subTitle}>Módulos existentes:</Text>
      {modulos.length === 0 && <Text>Nenhum módulo encontrado.</Text>}

      {modulos.map((modulo) => (
        <View key={modulo.id} style={styles.card}>
          {editandoId === modulo.id ? (
            <>
              <TextInput
                style={[styles.input, { marginBottom: 6 }]}
                value={tituloEditando}
                onChangeText={setTituloEditando}
                placeholder="Título do módulo"
              />
              <TextInput
                style={[styles.input, { height: 80, marginBottom: 6 }]}
                value={descricaoEditando}
                onChangeText={setDescricaoEditando}
                multiline
                placeholder="Descrição"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 5, backgroundColor: '#4caf50' }]} onPress={salvarEdicao}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { flex: 1, marginLeft: 5, backgroundColor: '#999' }]} onPress={cancelarEdicao}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.cardTitle}>{modulo.titulo}</Text>
              <Text>{modulo.descricao}</Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, marginRight: 5, backgroundColor: '#2196f3' }]}
                  onPress={() => iniciarEdicao(modulo)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, marginLeft: 5, backgroundColor: '#f44336' }]}
                  onPress={() => excluirModulo(modulo.id)} // função chamada corretamente
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      ))}

      <Text style={styles.subTitle}>Adicionar novo módulo:</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do módulo"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descrição"
        value={descricao}
        multiline
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={styles.button} onPress={adicionarModulo}>
        <Text style={styles.buttonText}>Adicionar Módulo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6ddff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#3e2f7a' },
  subTitle: { fontSize: 18, marginTop: 20, marginBottom: 10, color: '#3e2f7a' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6b5ca5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  selector: {
    backgroundColor: '#d9ccff',
    padding: 8,
    borderRadius: 8,
  },
  selectorAtivo: {
    backgroundColor: '#6b5ca5',
  },
  selectorText: {
    color: '#3e2f7a',
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6b5ca5',
  },
});
