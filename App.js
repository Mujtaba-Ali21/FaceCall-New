import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./src/Header";
import SignIn from "./src/screens/SignIn";
import OTPVerification from "./src/screens/OTPVerification";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#008DFE" barStyle="light-content" />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* <Header /> */}
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ title: "OTP Verification" }} />
          </Stack.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
