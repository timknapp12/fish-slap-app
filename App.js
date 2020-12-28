import React, { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LoginStack } from "./src/router";
import AppContext from "./src/utils/AppContext";
import { ThemeProvider } from "styled-components/native";
import { galaxyTheme } from "./src/styles/themes";
import * as firebase from "firebase";
import { firebaseConfig } from "./fbConfig";
import updateColorScheme from "./src/utils/updateColorScheme";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [theme, setTheme] = useState(galaxyTheme);
  const [user, setUser] = useState(null);

  console.log("user", user);

  // updateColorScheme();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          loadingLogin,
          setLoadingLogin,
          theme,
          setTheme,
          user,
          setUser,
        }}
      >
        <StatusBar
          backgroundColor={theme.linearGradientOne}
          barStyle={theme.statusBar}
        />

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
