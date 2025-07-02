import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import CadastroAluno from './screens/CadastroAluno';
import BottomTabs from './components/BottomTabs';

import MatematicaScreen from './screens/MatematicaScreen';
import PortuguesScreen from './screens/PortuguesScreen';
import InformaticaScreen from './screens/InformaticaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Acesso inicial */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CadastroAluno" component={CadastroAluno} />

        {/* Navegação com abas */}
        <Stack.Screen name="Home" component={BottomTabs} />

        {/* Telas internas dos cursos */}
        <Stack.Screen name="Matematica" component={MatematicaScreen} />
        <Stack.Screen name="Portugues" component={PortuguesScreen} />
        <Stack.Screen name="Informatica" component={InformaticaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
