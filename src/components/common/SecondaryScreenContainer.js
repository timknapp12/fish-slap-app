import React from "react";
import styled from "styled-components/native";
import { pink, darkBlue } from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";

const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SecondaryScreenContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={[pink, darkBlue]}
      start={{ x: 0.5, y: 0.0 }}
      style={{ height: "100%", width: "100%" }}
    >
      <Container>{children}</Container>
    </LinearGradient>
  );
};

export { SecondaryScreenContainer };
