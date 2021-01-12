import React from "react";
import { GeneralContainer, SecondaryText, GeneralIcon } from "../common";
import styled from "styled-components/native";

const ItemsWrapper = styled(GeneralContainer)`
  padding: 8px;
  border-color: ${(props) => props.theme.color};
  border-width: 1px;
  border-radius: 1px;
  z-index: 2;
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
      style={{ position: "absolute", top: 0, right: 0 }}
    >
      <GeneralIcon name="menu" />
      <ItemsWrapper width="auto" align="flex-end" padding={4}>
        <TextWrapper>
          <SecondaryText>FAQs</SecondaryText>
        </TextWrapper>
        <TextWrapper>
          <SecondaryText>Origin Story</SecondaryText>
        </TextWrapper>
        <TextWrapper style={{ marginBottom: 0 }}>
          <SecondaryText>Sign Out</SecondaryText>
        </TextWrapper>
      </ItemsWrapper>
    </GeneralContainer>
  );
};
export default HamburgerMenu;
