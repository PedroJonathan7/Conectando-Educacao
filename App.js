import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProvider } from './contexts/UserContext';

import LoginScreen from './screens/LoginScreen';
import CadastroAluno from './screens/CadastroAluno';
import EsqueceuSenhaScreen from './screens/EsqueceuSenhaScreen';
import BottomTabs from './components/BottomTabs';
import MatematicaScreen from './screens/MatematicaScreen';
import PortuguesScreen from './screens/PortuguesScreen';
import InformaticaScreen from './screens/InformaticaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
          <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenhaScreen} />
          <Stack.Screen name="Home" component={BottomTabs} />
          <Stack.Screen name="Matematica" component={MatematicaScreen} />
          <Stack.Screen name="Portugues" component={PortuguesScreen} />
          <Stack.Screen name="Informatica" component={InformaticaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
