import React from "react";
import styled from "styled-components/native";
import { lightPink, black, darkBlue } from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";

const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScreenContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={[darkBlue, black]}
      start={{ x: 0.49, y: 0.2 }}
      style={{ height: "100%", width: "100%" }}
    >
      <Container>{children}</Container>
    </LinearGradient>
  );
};

export { ScreenContainer };
