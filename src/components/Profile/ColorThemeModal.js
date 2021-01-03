import React from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import {
  ScreenContainer,
  GeneralContainer,
  MainText,
  H2,
  SaveIcon,
  CancelIcon,
} from "../common";
import { themes } from "./colorThemes";
import PreviewTheme from "./PreviewTheme";

const InfoBlock = styled(GeneralContainer)`
  padding: 4px 0;
  border-color: ${(props) => props.theme.color};
  border-width: 0.5px;
  border-radius: 4px;
`;

const ColorThemeModal = ({ isEditTheme, setIsEditTheme }) => {
  return (
    <Modal animationType="slide" visible={isEditTheme}>
      <ScreenContainer>
        <GeneralContainer height="100%" justify="flex-start">
          <GeneralContainer align="flex-end" direction="row">
            <CancelIcon
              onPress={() => {
                setIsEditTheme(false);
              }}
            />
            <SaveIcon />
          </GeneralContainer>
          <H2>Edit Color Theme</H2>
          <GeneralContainer padding={16}>
            <MainText>Select a Theme to Preview</MainText>
            <InfoBlock justify="space-between">
              {themes.map((item) => (
                <PreviewTheme item={item} />
              ))}
            </InfoBlock>
          </GeneralContainer>
        </GeneralContainer>
      </ScreenContainer>
    </Modal>
  );
};

export default ColorThemeModal;

// const theme = {
//   deviceColorScheme: 'light',
//   isSyncedToDevice: false,
//   selectedDefaultTheme: 'galaxy',
//   selectedLightTheme: 'sunrise',
//   selectedDarkTheme: 'light',
// }
