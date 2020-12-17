import React, { useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase";
import { ScreenContainer } from "../common";
import AppContext from "../../utils/AppContext";

const LoadingScreen = (props) => {
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const { setUser } = useContext(AppContext);

  const getUser = (uid) => {
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("AUTH STATE CHANGED CALLED ");
      if (user) {
        getUser(user.uid);
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
