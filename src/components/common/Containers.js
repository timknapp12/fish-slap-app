import React, { useContext } from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import AppContext from "../../utils/AppContext";

const sharedCss = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// GENERAL CONTAINER
const StlyedGeneral = styled.View`
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : "space-between")};
  align-items: ${({ align }) => (align ? align : "center")};
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "auto")};
  padding: ${({ padding }) => (padding ? `${padding}px` : "0px")};
  flex-direction: ${({ direction }) => (direction ? direction : "column")};
`;

export const GeneralContainer = ({
  width,
  height,
  padding,
  children,
  justify,
  ...props
}) => (
  <StlyedGeneral
    justify={justify}
    width={width}
    height={height}
    padding={padding}
    {...props}
  >
    {children}
  </StlyedGeneral>
);

// SCREEN CONTAINER
const Container = styled.View`
  ${sharedCss};
  padding: 64px 32px 32px 32px;
`;

export const ScreenContainer = ({ children }) => {
  const { theme } = useContext(AppContext);
  return (
    <LinearGradient
      colors={[theme.linearGradientOne, theme.linearGradientTwo]}
      start={{ x: 0.49, y: 0.2 }}
      style={{ height: "100%", width: "100%" }}
    >
      <Container>{children}</Container>
    </LinearGradient>
  );
};
