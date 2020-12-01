import React, { useContext } from "react";
import { Text, Button } from "react-native";
import firebase from "firebase";
import AppContext from "../../utils/AppContext";
import { ScreenContainer } from "../common";

const HomeScreen = () => {
  const { setLoadingLogin } = useContext(AppContext);
  return (
    <ScreenContainer>
      <Text style={{ color: "white" }}>HomeScreen</Text>
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
