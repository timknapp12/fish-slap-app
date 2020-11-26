import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginStack } from "./src/router";
import AppContext from "./src/utils/AppContext";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const App = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  return (
    <AppContext.Provider value={{ loadingLogin, setLoadingLogin }}>
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    </AppContext.Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
