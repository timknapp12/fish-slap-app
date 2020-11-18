import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { pink } from "../../styles/colors";

const Container = styled.View`
  flex: 1;
  background-color: ${pink};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScreenContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export { ScreenContainer };
