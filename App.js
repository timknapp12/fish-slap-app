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
import AsyncStorage from "@react-native-async-storage/async-storage";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const readItemFromStorage = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    const item = jsonValue != null ? JSON.parse(jsonValue) : null;
    setTheme(item);
  };

  const writeItemToStorage = async (newValue) => {
    const jsonValue = JSON.stringify(newValue);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
    setTheme(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const colorScheme = useColorScheme();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(galaxyTheme);
  const [updateToFirebasePending, setUpdateToFirebasePending] = useState(false);

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
            writeItemToStorage(doc.data().theme.currentTheme);
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
    // return setTheme(user?.theme?.currentTheme ?? galaxyTheme);
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
