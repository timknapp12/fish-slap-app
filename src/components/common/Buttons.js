import React from "react";
import { View, StyleSheet } from "react-native";
import { blue, green, white } from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import { MainText } from "../common";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

// PRIMARY BUTTON

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
  text: {
    letterSpacing: 1.5,
  },
});

export const PrimaryButton = ({ children = "Button", ...props }) => (
  <View style={styles.button}>
    <LinearGradient
      style={{ borderRadius: 12 }}
      colors={[blue, green]}
      start={{ x: 0.49, y: 0.2 }}
    >
      <Container {...props}>
        <MainText style={styles.text}>{children}</MainText>
      </Container>
    </LinearGradient>
  </View>
);

// LOGIN BUTTON
const StyledLoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.background && props.background};
`;

const LogoAndTextContainer = styled.View`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const StyledIcon = styled(Ionicons)`
  margin-right: 8px;
`;

const googleColor = "#4285F4";
const facebookColor = "#3b5998";

export const LoginButton = ({
  background,
  title = "Google",
  icon,
  ...props
}) => (
  <StyledLoginButton
    background={title === "Google" ? googleColor : facebookColor}
    {...props}
  >
    <LogoAndTextContainer>
      <StyledIcon
        name={title === "Google" ? "google" : "facebook"}
        color={white}
        size={16}
      />
      <MainText>{`Sign in with ${title}`}</MainText>
    </LogoAndTextContainer>
  </StyledLoginButton>
);
