import React, { useState, useContext } from "react";
import { Button, TouchableWithoutFeedback, Vibration } from "react-native";
import styled from "styled-components/native";
import firebase from "firebase";
import AppContext from "../../utils/AppContext";
import { ScreenContainer, MainText, GeneralContainer } from "../common";
import HamburgerMenu from "./HamburgerMenu";
import logoLeft from "../../assets/fish-slap-icon-tail-left.png";
import logoRight from "../../assets/fish-slap-icon-tail-right.png";

const Logo = styled.Image`
  height: 200px;
  width: 200px;
`;

const HomeScreen = () => {
  const { setLoadingLogin } = useContext(AppContext);

  const [isLogoLeft, setIsLogoLeft] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <ScreenContainer>
      <GeneralContainer height="100%" justify="flex-start">
        <HamburgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MainText>Home Screen</MainText>
        <Button
          title="Sign out right now please"
          onPress={() => {
            firebase.auth().signOut();
            setLoadingLogin(false);
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            Vibration.vibrate();
            setIsLogoLeft((state) => !state);
          }}
        >
          <Logo source={isLogoLeft ? logoLeft : logoRight} />
        </TouchableWithoutFeedback>
      </GeneralContainer>
    </ScreenContainer>
  );
};
export default HomeScreen;
