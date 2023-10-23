import { StyleSheet, View, Text } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chat from "./screens/Chat";
import SignIn from "./screens/SignIn";

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#0e806a",
        },
      }}
    >
      <Tab.Screen name="Chats" component={Chat} />

      <Tab.Screen name="Status" component={Chat} />

      <Tab.Screen name="Calls" component={Chat} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    display: "none",
  },
});

export default Navigation;