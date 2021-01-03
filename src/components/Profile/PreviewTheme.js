import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MainText, GeneralContainer } from "../common";
import AppContext from "../../utils/AppContext";

const Wrapper = styled(GeneralContainer)`
  opacity: ${(props) => (props.selected ? 1 : 0.4)};
`;

const PreviewTheme = ({ item }) => {
  const { setTheme, theme } = useContext(AppContext);

  return (
    <Wrapper selected={item.name === theme.name} key={item.id}>
      <TouchableOpacity
        onPress={() => {
          setTheme(item);
        }}
      >
        <MainText>{item.displayName}</MainText>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default PreviewTheme;
