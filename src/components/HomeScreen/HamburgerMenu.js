import React from "react";
import { GeneralContainer, SecondaryText, GeneralIcon } from "../common";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const ItemsWrapper = styled(GeneralContainer)`
  padding: 8px;
  border-color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.linearGradientOne};
  border-width: 1px;
  border-radius: 1px;
`;

const TextWrapper = styled(GeneralContainer)`
  margin-bottom: 4px;
  border-bottom-color: ${(props) => props.theme.color};
  border-bottom-width: 1px;
`;

const HamburgerMenu = () => {
  return (
    <GeneralContainer
      width="auto"
      align="flex-end"
      style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}
    >
      <GeneralIcon name="menu" />
      <ItemsWrapper width="auto" align="flex-end" padding={4}>
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

        <TouchableOpacity onPress={() => alert("this is pushed")}>
          <TextWrapper style={{ marginBottom: 0 }}>
            <SecondaryText>Sign Out</SecondaryText>
          </TextWrapper>
        </TouchableOpacity>
      </ItemsWrapper>
    </GeneralContainer>
  );
};
export default HamburgerMenu;
