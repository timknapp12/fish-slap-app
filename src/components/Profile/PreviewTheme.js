import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MainText, GeneralContainer } from "../common";

const Wrapper = styled(GeneralContainer)`
  opacity: ${(props) => (props.selected ? 1 : 0.4)};
`;

const InvertedText = styled(MainText)`
  color: ${(props) => props.theme.linearGradientOne};
`;

const PreviewTheme = ({ item, selected, onPress }) => {
  return (
    <Wrapper selected={selected}>
      <TouchableOpacity onPress={onPress}>
        <InvertedText>{item.displayName}</InvertedText>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default PreviewTheme;
