import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeProfessorScreen from "../screens/HomeProfessorScreen";
import CursoScreen from "../screens/CursoScreen";
import ProfessorChatScreen from "../screens/ProfessorChatScreen";
import ProfessorPerfilScreen from "../screens/ProfessorPerfilScreen"; // Alterado para o novo componente

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
          else if (route.name === "Cursos") iconName = "book";
          else if (route.name === "Chat") iconName = "chatbubbles";
          else if (route.name === "Perfil") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="Início"
        component={HomeProfessorScreen}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="Cursos"
        component={CursoScreen}
        options={{ title: "Cursos" }}
      />
      <Tab.Screen
        name="Chat"
        component={ProfessorChatScreen}
        options={{ title: "Chat" }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfessorPerfilScreen}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}
