import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";

const LoadingScreen = (props) => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("AUTH STATE CHANGED CALLED ");
      if (user) {
        props.navigation.navigate("DashboardScreen");
      } else {
        props.navigation.navigate("LoginScreen");
      }
    });
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
