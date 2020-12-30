import React, { useState, useEffect } from "react";
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
  const [updateToFirebasePending, setUpdateToFirebasePending] = useState(false);

  console.log("User from state:", user);

  const db = firebase.firestore();
  useEffect(() => {
    if (user) {
      const subscriber = db
        .collection("users")
        .doc(user.uid)
        .onSnapshot(function (doc) {
          console.log("Current data: ", doc.data());
          setUser(doc.data());
          setUpdateToFirebasePending(false);
        });
      return () => {
        console.log("running cleanup");
        subscriber();
      };
    }
  }, [updateToFirebasePending]);

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
          setUpdateToFirebasePending,
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
