import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeProfessorScreen from "../screens/HomeProfessorScreen";
import EditarCursosScreen from "../screens/EditarCursosScreen";
import ProfessorListaAlunos from "../screens/ProfessorListaAlunos"; // Caminho direto
import ProfessorPerfilScreen from "../screens/ProfessorPerfilScreen";

const Tab = createBottomTabNavigator();

export default function ProfessorBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#6b5ca5",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Início") iconName = "home";
          else if (route.name === "Editar Cursos") iconName = "book";
          else if (route.name === "Chat") iconName = "chatbubbles";
          else if (route.name === "Perfil") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeProfessorScreen} />
      <Tab.Screen name="Editar Cursos" component={EditarCursosScreen} />
      <Tab.Screen name="Chat" component={ProfessorListaAlunos} />
      <Tab.Screen name="Perfil" component={ProfessorPerfilScreen} />
    </Tab.Navigator>
  );
}