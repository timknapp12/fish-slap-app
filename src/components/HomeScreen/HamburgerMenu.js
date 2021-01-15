import React, { useRef, useContext } from "react";
import { Animated } from "react-native";
import { GeneralContainer, SecondaryText, GeneralIcon } from "../common";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import firebase from "firebase";
import AppContext from "../../utils/AppContext";

const ItemsWrapper = styled(Animated.View)`
  padding: 8px;
  border-color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.linearGradientOne};
  border-width: 2px;
  border-radius: 2px;
  padding: 4px;
  display: flex;
  width: auto;
  align-items: flex-end;
  opacity: 1;
`;

const TextWrapper = styled(GeneralContainer)`
  margin-bottom: 4px;
  border-bottom-color: ${(props) => props.theme.color};
  border-bottom-width: 1px;
`;

const HamburgerMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  setIsLogoLeft,
  fadeOut,
  fadeAnim,
}) => {
  const { setLoadingLogin } = useContext(AppContext);

  const fadeIn = () => {
    setIsMenuOpen(true);
    // Will change fadeAnim value to 1 in .5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      fadeOut();
    } else {
      fadeIn();
    }
  };
  return (
    <GeneralContainer
      width="auto"
      align="flex-end"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        elevation: 2,
      }}
    >
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
      >
        <GeneralIcon name="menu" />
      </TouchableOpacity>
      {isMenuOpen && (
        <ItemsWrapper
          style={[
            {
              opacity: fadeAnim, // Bind opacity to animated value
              transform: [{ scale: fadeAnim }], // Bind opacity to animated value
            },
          ]}
          width="auto"
          align="flex-end"
          padding={4}
        >
          <TouchableOpacity onPress={() => alert("this is pushed")}>
            <TextWrapper>
              <SecondaryText>FAQs</SecondaryText>
            </TextWrapper>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert("this is pushed")}>
            <TextWrapper>
              <SecondaryText>Origin Story</SecondaryText>
            </TextWrapper>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              firebase.auth().signOut();
              setLoadingLogin(false);
              setIsLogoLeft(true);
              setIsMenuOpen(false);
            }}
          >
            <TextWrapper style={{ marginBottom: 0 }}>
              <SecondaryText>Sign Out</SecondaryText>
            </TextWrapper>
          </TouchableOpacity>
        </ItemsWrapper>
      )}
    </GeneralContainer>
  );
};
export default HamburgerMenu;
