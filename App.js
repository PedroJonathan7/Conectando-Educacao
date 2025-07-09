import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Contexto global
import { UserProvider } from './contexts/UserContext';

// Telas de Aluno
import LoginScreen from './screens/LoginScreen';
import CadastroAluno from './screens/CadastroAluno';
import EsqueceuSenhaScreen from './screens/EsqueceuSenhaScreen';

// Telas de Professor
import LoginProfessor from './screens/LoginProfessor';
import CadastroProfessor from './screens/CadastroProfessor';

// Navegação aluno
import BottomTabs from './components/BottomTabs';
import MatematicaScreen from './screens/MatematicaScreen';
import PortuguesScreen from './screens/PortuguesScreen';
import InformaticaScreen from './screens/InformaticaScreen';

// Navegação professor
import HomeProfessorScreen from './screens/HomeProfessorScreen';
import EditarCursosScreen from './screens/EditarCursosScreen';
import EditarAcoesScreen from './screens/EditarAcoesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          {/* Login e Cadastro Aluno */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
          <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenhaScreen} />

          {/* Login e Cadastro Professor */}
          <Stack.Screen name="LoginProfessor" component={LoginProfessor} />
          <Stack.Screen name="CadastroProfessor" component={CadastroProfessor} />

          {/* Aluno Navegação Principal */}
          <Stack.Screen name="Home" component={BottomTabs} />
          <Stack.Screen name="Matematica" component={MatematicaScreen} />
          <Stack.Screen name="Portugues" component={PortuguesScreen} />
          <Stack.Screen name="Informatica" component={InformaticaScreen} />

          {/* Professor Navegação Principal */}
          <Stack.Screen name="HomeProfessor" component={HomeProfessorScreen} />
          <Stack.Screen name="EditarCursos" component={EditarCursosScreen} />
          <Stack.Screen name="EditarAcoes" component={EditarAcoesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
