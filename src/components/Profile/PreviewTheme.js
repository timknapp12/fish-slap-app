import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MainText, GeneralContainer } from "../common";

const Wrapper = styled(GeneralContainer)`
  opacity: ${(props) => (props.selected ? 1 : 0.4)};
`;

const PreviewTheme = ({ item, selected, onPress }) => {
  return (
    <Wrapper selected={selected}>
      <TouchableOpacity onPress={onPress}>
        <MainText>{item.displayName}</MainText>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default PreviewTheme;
