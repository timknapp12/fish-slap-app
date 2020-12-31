import React, { useContext } from "react";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ScreenContainer,
  GeneralContainer,
  MainText,
  H2,
  SaveIcon,
  CancelIcon,
} from "../common";
import { themes } from "./colorThemes";
import AppContext from "../../utils/AppContext";

const ColorThemeModal = ({ isEditTheme, setIsEditTheme }) => {
  const { setTheme } = useContext(AppContext);
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
            <MainText>Select a Color Theme</MainText>
            <GeneralContainer
              justify="space-between"
              height="150px"
              padding={16}
            >
              {themes.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setTheme(item.name);
                  }}
                >
                  <MainText>{item.displayName}</MainText>
                </TouchableOpacity>
              ))}
            </GeneralContainer>
          </GeneralContainer>
        </GeneralContainer>
      </ScreenContainer>
    </Modal>
  );
};

export default ColorThemeModal;
