import React, { useContext } from "react";
import { Button } from "react-native";
import firebase from "firebase";
import AppContext from "../../utils/AppContext";
import { ScreenContainer, MainText } from "../common";

const HomeScreen = () => {
  const { setLoadingLogin } = useContext(AppContext);
  return (
    <ScreenContainer>
      <MainText>Home Screen</MainText>
      <Button
        title="Sign out"
        onPress={() => {
          firebase.auth().signOut();
          setLoadingLogin(false);
        }}
      />
    </ScreenContainer>
  );
};
export default HomeScreen;
