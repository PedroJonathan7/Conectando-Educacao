import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';


// Telas principais
import CadastroAluno from './screens/CadastroAluno';
import LoginScreen from './screens/LoginScreen';

// Telas internas (após login)
import BottomTabs from './components/BottomTabs';
import InformaticaScreen from './screens/InformaticaScreen';
import MatematicaScreen from './screens/MatematicaScreen';
import PortuguesScreen from './screens/PortuguesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Telas iniciais */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CadastroAluno" component={CadastroAluno} />

        {/* Navegação principal com abas */}
        <Stack.Screen name="Home" component={BottomTabs} />

        {/* Telas de cursos acessadas pelas abas */}
        <Stack.Screen name="Matematica" component={MatematicaScreen} />
        <Stack.Screen name="Portugues" component={PortuguesScreen} />
        <Stack.Screen name="Informatica" component={InformaticaScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
