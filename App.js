import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Contexto global
import { UserProvider } from './contexts/UserContext';

// Telas de Autenticação
import LoginScreen from './screens/LoginScreen';
import CadastroAluno from './screens/CadastroAluno';
import EsqueceuSenhaScreen from './screens/EsqueceuSenhaScreen';
import LoginProfessor from './screens/LoginProfessor';
import CadastroProfessor from './screens/CadastroProfessor';

// Telas do Aluno
import BottomTabs from './components/BottomTabs';
import MatematicaScreen from './screens/MatematicaScreen';
import PortuguesScreen from './screens/PortuguesScreen';
import InformaticaScreen from './screens/InformaticaScreen';
import AcoesAlunoScreen from './screens/AcoesAlunoScreen';  // Apareceu só no segundo arquivo

// Telas do Professor
import ProfessorBottomTabs from './components/ProfessorBottomTabs'; // Só no primeiro arquivo
import HomeProfessorScreen from './screens/HomeProfessorScreen'; // Só no segundo arquivo
import EditarCursosScreen from './screens/EditarCursosScreen';
import EditarAcoesScreen from './screens/EditarAcoesScreen';

// Telas de Chat
import ChatScreen from './screens/ChatScreen';
import ChatConversa from './screens/ChatConversa';
import ProfessorListaAlunos from './screens/ProfessorListaAlunos';
import ProfessorChatScreen from './screens/ProfessorChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

          {/* Telas de Autenticação */}
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
            <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenhaScreen} />
            <Stack.Screen name="LoginProfessor" component={LoginProfessor} />
            <Stack.Screen name="CadastroProfessor" component={CadastroProfessor} />
          </Stack.Group>

          {/* Navegação Aluno */}
          <Stack.Group>
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen name="Matematica" component={MatematicaScreen} />
            <Stack.Screen name="Portugues" component={PortuguesScreen} />
            <Stack.Screen name="Informatica" component={InformaticaScreen} />
            <Stack.Screen name="AcoesAluno" component={AcoesAlunoScreen} />
          </Stack.Group>

          {/* Chat Aluno */}
          <Stack.Group>
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="ChatConversa" component={ChatConversa} />
          </Stack.Group>

          {/* Navegação Professor */}
          <Stack.Group>
            <Stack.Screen name="HomeProfessor" component={ProfessorBottomTabs ?? HomeProfessorScreen} />
            <Stack.Screen name="EditarCursos" component={EditarCursosScreen} />
            <Stack.Screen name="EditarAcoes" component={EditarAcoesScreen} />
          </Stack.Group>

          {/* Chat Professor */}
          <Stack.Group>
            <Stack.Screen name="ProfessorListaAlunos" component={ProfessorListaAlunos} />
            <Stack.Screen name="ProfessorChat" component={ProfessorChatScreen} />
          </Stack.Group>

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}