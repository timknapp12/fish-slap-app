import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LoginStack } from "./src/router";
import AppContext from "./src/utils/AppContext";
import { ThemeProvider } from "styled-components/native";
import { galaxyTheme } from "./src/styles/themes";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [theme, setTheme] = useState(galaxyTheme);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{ loadingLogin, setLoadingLogin, theme, setTheme }}
      >
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      </AppContext.Provider>
    </ThemeProvider>
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
