import React from "react";
import { white } from "../../styles/colors";
import styled from "styled-components/native";

const sharedCss = {
  color: white,
  fontWeight: "bold",
};

// MAIN
const StyledText = styled.Text`
  ${sharedCss};
`;

export const MainText = ({ children, ...props }) => (
  <StyledText {...props}>{children}</StyledText>
);

// MAIN HEADING
const StlyedH1 = styled.Text`
  ${sharedCss};
  font-size: 24px;
`;

export const H1 = ({ children, ...props }) => (
  <StlyedH1 {...props}>{children}</StlyedH1>
);

// H2
const StlyedH2 = styled.Text`
  ${sharedCss};
  font-size: 18px;
`;

export const H2 = ({ children, ...props }) => (
  <StlyedH2 {...props}>{children}</StlyedH2>
);
