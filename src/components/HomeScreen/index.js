import React, { useContext } from "react";
import { Button } from "react-native";
import firebase from "firebase";
import AppContext from "../../utils/AppContext";
import { ScreenContainer, MainText, GeneralContainer } from "../common";
import HamburgerMenu from "./HamburgerMenu";

const HomeScreen = () => {
  const { setLoadingLogin } = useContext(AppContext);
  return (
    <ScreenContainer>
      <GeneralContainer height="100%" justify="flex-start">
        <HamburgerMenu style={{ zIndex: 2 }} />
        <MainText>Home Screen</MainText>
        <Button
          style={{ zIndex: 1 }}
          title="Sign out right now please"
          onPress={() => {
            firebase.auth().signOut();
            setLoadingLogin(false);
          }}
        />
      </GeneralContainer>
    </ScreenContainer>
  );
};
export default HomeScreen;
