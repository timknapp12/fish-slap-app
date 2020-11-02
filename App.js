import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";

// green = 43cc59
// blue = 1982dd
// pink = e84b87

const App = () => {
  firebase.initializeApp(firebaseConfig);
  useEffect(() => {
    return () => {
      firebase.initializeApp(firebaseConfig);
    };
  }, []);

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user exists");
      } else {
        console.log("no user");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Login />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
