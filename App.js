import React, { useState, useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LoginStack } from "./src/router";
import AppContext from "./src/utils/AppContext";
import { ThemeProvider } from "styled-components/native";
import { galaxyTheme } from "./src/styles/themes";
import { pink } from "./src/styles/colors";
import * as firebase from "firebase";
import { firebaseConfig } from "./fbConfig";
import updateColorScheme from "./src/utils/updateColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  // this pulls data from async storage and sets the user current theme
  const readItemFromStorage = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    const item = jsonValue != null ? JSON.parse(jsonValue) : null;
    setTheme(item);
  };

  // this saves to async storage and also updates theme in local state
  const writeItemToStorage = async (newValue) => {
    const jsonValue = JSON.stringify(newValue);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
    setTheme(newValue);
  };
  // this reads the current theme from async storage on first render
  useEffect(() => {
    readItemFromStorage();
    return () => {
      writeItemToStorage(user?.theme?.currentTheme ?? galaxyTheme);
    };
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

  // This checks the Theme of the user's device and updates the current color theme accordingly
  useEffect(() => {
    if (user) {
      console.log("useEffect is running to update color scheme");
      updateColorScheme(colorScheme, user, setUpdateToFirebasePending);
    }
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
          backgroundColor={theme?.linearGradientOne ?? pink}
          barStyle={theme?.statusBar ?? "light-content"}
        />

        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      </AppContext.Provider>
    </ThemeProvider>
  );
};
export default App;
