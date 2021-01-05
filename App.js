import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, useColorScheme } from "react-native";
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
  const colorScheme = useColorScheme();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(user?.theme?.currentTheme ?? galaxyTheme);
  const [updateToFirebasePending, setUpdateToFirebasePending] = useState(false);

  // console.log("User from state:", user);

  const db = firebase.firestore();
  useEffect(() => {
    if (user) {
      const subscriber = db
        .collection("users")
        .doc(user.uid)
        .onSnapshot(function (doc) {
          if (doc.exists) {
            console.log("Current data: ", doc.data());
            setUser(doc.data());
            setTheme(doc.data().theme.currentTheme);
            setUpdateToFirebasePending(false);
          } else {
            console.log("no document exists");
          }
        });
      return () => {
        console.log("running cleanup");
        subscriber();
      };
    }
  }, [updateToFirebasePending]);

  useEffect(() => {
    if (user) {
      updateColorScheme(colorScheme, user, setUpdateToFirebasePending);
    }
    return setTheme(user?.theme?.currentTheme ?? galaxyTheme);
  }, [colorScheme]);

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
