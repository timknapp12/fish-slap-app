import React from "react";
import { StyleSheet } from "react-native";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginStack } from "./router";

import LoginScreen from "./components/LoginScreen";
import DashboardScreen from "./components/DashboardScreen";
import LoadingScreen from "./components/LoadingScreen";

import * as firebase from "firebase";
import { firebaseConfig } from "./config";
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <LoginStack />
      {/* <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};
export default App;

// const AppSwitchNavigator = createSwitchNavigator({
//   LoadingScreen: LoadingScreen,
//   LoginScreen: LoginScreen,
//   DashboardScreen: DashboardScreen,
// });

// const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
