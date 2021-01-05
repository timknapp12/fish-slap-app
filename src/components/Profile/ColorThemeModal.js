import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { Modal, TouchableWithoutFeedback } from "react-native";
import {
  ScreenContainer,
  GeneralContainer,
  MainText,
  SecondaryText,
  H2,
  SaveIcon,
  CancelIcon,
} from "../common";
import PreviewTheme from "./PreviewTheme";
import { green } from "../../styles/colors";
import AppContext from "../../utils/AppContext";
import {
  lightTheme,
  midnightTheme,
  sunriseTheme,
  galaxyTheme,
} from "../../styles/themes";

export const themes = [lightTheme, midnightTheme, sunriseTheme, galaxyTheme];

const InfoBlock = styled(GeneralContainer)`
  padding: 4px 0;
  border-color: ${(props) => props.theme.color};
  border-width: 0.5px;
  border-radius: 4px;
`;

const buttonHeight = 18;

const RadioOutline = styled(GeneralContainer)`
  height: ${buttonHeight}px;
  width: ${buttonHeight}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.color};
  border-radius: ${buttonHeight / 2}px;
  justify-content: center;
  margin-right: 8px;
  margin-bottom: 4px;
`;

const RadioFill = styled.View`
  height: ${buttonHeight / 2}px;
  width: ${buttonHeight / 2}px;
  border-radius: ${buttonHeight / 4}px;
  background-color: ${green};
`;

const ColorThemeModal = ({ isEditTheme, setIsEditTheme, userTheme }) => {
  const { setTheme, theme } = useContext(AppContext);

  const initialValue = userTheme?.isSyncedToDevice ?? false;
  const [isSyncedToDevice, setIsSyncedToDevice] = useState(initialValue);

  const initialDefaultTheme = userTheme?.selectedLightTheme ?? theme;
  const [selectedDefaultTheme, setSelectedDefaultTheme] = useState(
    initialDefaultTheme
  );

  const initialLightTheme = userTheme?.selectedLightTheme ?? lightTheme;
  const [selectedLightTheme, setSelectedLightTheme] = useState(
    initialLightTheme
  );

  const initialDarkTheme = userTheme?.selectedDarkTheme ?? midnightTheme;
  const [selectedDarkTheme, setSelectedDarkTheme] = useState(initialDarkTheme);

  const saveTheme = () => {};

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
                <PreviewTheme
                  key={item.id}
                  item={item}
                  selected={item.name === theme.name}
                  onPress={() => {
                    setTheme(item);
                  }}
                />
              ))}
            </InfoBlock>
          </GeneralContainer>

          <GeneralContainer padding={16}>
            <GeneralContainer direction="row" justify="flex-start">
              <TouchableWithoutFeedback
                onPress={() => setIsSyncedToDevice(false)}
              >
                <RadioOutline>
                  {!isSyncedToDevice && <RadioFill />}
                </RadioOutline>
              </TouchableWithoutFeedback>
              <MainText>Set One Constant Theme</MainText>
            </GeneralContainer>
            {!isSyncedToDevice && (
              <InfoBlock justify="space-between">
                {themes.map((item) => (
                  <PreviewTheme
                    key={item.id}
                    item={item}
                    selected={item.name === selectedDefaultTheme.name}
                    onPress={() => {
                      setSelectedDefaultTheme(item);
                    }}
                  />
                ))}
              </InfoBlock>
            )}
          </GeneralContainer>

          <GeneralContainer padding={16}>
            <GeneralContainer direction="row" justify="flex-start">
              <TouchableWithoutFeedback
                onPress={() => setIsSyncedToDevice(true)}
              >
                <RadioOutline>{isSyncedToDevice && <RadioFill />}</RadioOutline>
              </TouchableWithoutFeedback>
              <MainText>Sync Theme to Device Settings</MainText>
            </GeneralContainer>
            {isSyncedToDevice && (
              <GeneralContainer>
                <SecondaryText>
                  Select a theme to use when your device is on "light" theme:
                </SecondaryText>
                <InfoBlock justify="space-between">
                  {themes.map((item) => (
                    <PreviewTheme
                      key={item.id}
                      item={item}
                      selected={item.name === selectedLightTheme.name}
                      onPress={() => {
                        setSelectedLightTheme(item);
                      }}
                    />
                  ))}
                </InfoBlock>
                <SecondaryText style={{ marginTop: 6 }}>
                  Select a theme to use when your device is on "dark" theme:
                </SecondaryText>
                <InfoBlock justify="space-between">
                  {themes.map((item) => (
                    <PreviewTheme
                      key={item.id}
                      item={item}
                      selected={item.name === selectedDarkTheme.name}
                      onPress={() => {
                        setSelectedDarkTheme(item);
                      }}
                    />
                  ))}
                </InfoBlock>
              </GeneralContainer>
            )}
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
