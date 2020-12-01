import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase";
import { ScreenContainer } from "../common";

const LoadingScreen = (props) => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("AUTH STATE CHANGED CALLED ");
      if (user) {
        props.navigation.navigate("Tabs");
      } else {
        props.navigation.navigate("LoginScreen");
      }
    });
  };

  return (
    <ScreenContainer>
      <ActivityIndicator size="large" />
    </ScreenContainer>
  );
};

export default LoadingScreen;
