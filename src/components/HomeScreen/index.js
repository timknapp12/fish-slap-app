import React, { useContext } from "react";
import { Text, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import AppContext from "../../utils/AppContext";
import { SecondaryScreenContainer } from "../common";

const HomeScreen = () => {
  const { setLoadingLogin } = useContext(AppContext);
  return (
    <SecondaryScreenContainer>
      <Text style={{ color: "white" }}>HomeScreen</Text>
      <Button
        title="Sign out"
        onPress={() => {
          firebase.auth().signOut();
          setLoadingLogin(false);
        }}
      />
    </SecondaryScreenContainer>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
