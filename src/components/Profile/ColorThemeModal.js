import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import * as firebase from "firebase";
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
import ThemeStrings from "./ThemeStrings";
import { green } from "../../styles/colors";
import AppContext from "../../utils/AppContext";
import {
  lightTheme,
  midnightTheme,
  sunriseTheme,
  galaxyTheme,
} from "../../styles/themes";

const themes = [lightTheme, midnightTheme, sunriseTheme, galaxyTheme];
const themeNames = [
  "lightTheme",
  "midnightTheme",
  "sunriseTheme",
  "galaxyTheme",
];

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

const ColorThemeModal = ({
  isEditTheme,
  setIsEditTheme,
  setUpdateToFirebasePending,
}) => {
  const { setTheme, theme, user } = useContext(AppContext);
  // currentTheme
  // console.log("user.theme", user.theme);

  const initialValue = user.theme.isSyncedToDevice;
  const [isSyncedToDevice, setIsSyncedToDevice] = useState(initialValue);
  console.log("isSyncedToDevice", isSyncedToDevice);

  const initialDefaultTheme = user.theme.defaultTheme;
  const [selectedDefaultTheme, setSelectedDefaultTheme] = useState(
    initialDefaultTheme
  );
  console.log("selectedDefaultTheme", selectedDefaultTheme);

  const initialLightTheme = user.theme.lightTheme;
  const [selectedLightTheme, setSelectedLightTheme] = useState(
    initialLightTheme
  );
  console.log("selectedLightTheme", selectedLightTheme);

  const initialDarkTheme = user.theme.darkTheme;
  const [selectedDarkTheme, setSelectedDarkTheme] = useState(initialDarkTheme);

  console.log("selectedDarkTheme", selectedDarkTheme);

  const saveTheme = () => {
    const data = {
      theme: {
        ...user.theme,
        isSyncedToDevice: isSyncedToDevice,
        defaultTheme: selectedDefaultTheme,
        lightTheme: selectedLightTheme,
        darkTheme: selectedDarkTheme,
      },
    };
    console.log("data", data);
    const db = firebase.firestore();
    db.collection("users")
      .doc(user.uid)
      .update(data)
      .then(() => setIsEditTheme(false))
      .catch((error) => {
        Alert.alert(error);
      });
    setUpdateToFirebasePending(true);
  };

  return (
    <Modal animationType="slide" visible={isEditTheme}>
      <ScreenContainer>
        <GeneralContainer height="100%" justify="flex-start">
          <GeneralContainer align="flex-end" direction="row">
            <CancelIcon
              onPress={() => {
                setTheme(user.theme.currentTheme);
                setIsEditTheme(false);
              }}
            />
            <SaveIcon onPress={saveTheme} />
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
                {themeNames.map((item) => (
                  <ThemeStrings
                    key={item}
                    item={item}
                    selected={item === selectedDefaultTheme}
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
                  {themeNames.map((item) => (
                    <ThemeStrings
                      key={item}
                      item={item}
                      selected={item === selectedLightTheme}
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
                  {themeNames.map((item) => (
                    <ThemeStrings
                      key={item}
                      item={item}
                      selected={item === selectedDarkTheme}
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
