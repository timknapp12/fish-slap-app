import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { Modal, useColorScheme, Pressable } from "react-native";
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
import { matchTheme } from "../../utils/updateColorScheme";

const themes = [lightTheme, midnightTheme, sunriseTheme, galaxyTheme];

const InfoBlock = styled(GeneralContainer)`
  padding: 4px 0;
  border-width: 0.5px;
  border-radius: 24px;
  margin-top: 2px;
  background-color: ${(props) => props.theme.color};
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

const DivisionLine = styled.View`
  height: 1px;
  width: 100%;
  border-top-width: 6px;
  border-color: ${(props) => props.theme.color};
  margin: 6px 0px;
`;

const ColorThemeModal = ({
  isEditTheme,
  setIsEditTheme,
  setUpdateToFirebasePending,
}) => {
  const { setTheme, theme, user } = useContext(AppContext);
  const colorScheme = useColorScheme();

  const initialValue = user.theme.isSyncedToDevice;
  const [isSyncedToDevice, setIsSyncedToDevice] = useState(initialValue);

  const initialDefaultTheme = user.theme.defaultTheme;
  const [selectedDefaultTheme, setSelectedDefaultTheme] = useState(
    initialDefaultTheme
  );

  const initialLightTheme = user.theme.lightTheme;
  const [selectedLightTheme, setSelectedLightTheme] = useState(
    initialLightTheme
  );

  const initialDarkTheme = user.theme.darkTheme;
  const [selectedDarkTheme, setSelectedDarkTheme] = useState(initialDarkTheme);

  const findTheme = () => {
    let newTheme;
    if (!isSyncedToDevice) {
      newTheme = matchTheme(selectedDefaultTheme);
      return newTheme;
    }
    if (isSyncedToDevice) {
      newTheme =
        colorScheme === "light"
          ? matchTheme(selectedLightTheme)
          : matchTheme(selectedDarkTheme);
      return newTheme;
    }
  };

  const saveTheme = () => {
    const newTheme = findTheme();
    const data = {
      theme: {
        ...user.theme,
        currentTheme: newTheme,
        isSyncedToDevice: isSyncedToDevice,
        defaultTheme: selectedDefaultTheme,
        lightTheme: selectedLightTheme,
        darkTheme: selectedDarkTheme,
      },
    };
    const db = firebase.firestore();
    db.collection("users")
      .doc(user.uid)
      .update(data)
      .then(() => setIsEditTheme(false))
      .catch((error) => {
        Alert.alert(error);
      });
    setTheme(newTheme);
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
          <H2>Choose A Theme Option</H2>

          <GeneralContainer padding={16}>
            <GeneralContainer direction="row" justify="flex-start">
              <Pressable hitSlop={8} onPress={() => setIsSyncedToDevice(false)}>
                <RadioOutline>
                  {!isSyncedToDevice && <RadioFill />}
                </RadioOutline>
              </Pressable>
              <MainText>1. Set One Constant Theme</MainText>
            </GeneralContainer>
            {!isSyncedToDevice && (
              <InfoBlock justify="space-between">
                {themes.map((item) => (
                  <PreviewTheme
                    key={item.id}
                    item={item}
                    selected={item.name === selectedDefaultTheme}
                    onPress={() => {
                      setSelectedDefaultTheme(item.name);
                    }}
                  />
                ))}
              </InfoBlock>
            )}
          </GeneralContainer>

          <GeneralContainer padding={16}>
            <GeneralContainer direction="row" justify="flex-start">
              <Pressable hitSlop={8} onPress={() => setIsSyncedToDevice(true)}>
                <RadioOutline>{isSyncedToDevice && <RadioFill />}</RadioOutline>
              </Pressable>
              <MainText>2. Sync Theme to Device Settings</MainText>
            </GeneralContainer>
            {isSyncedToDevice && (
              <GeneralContainer>
                <SecondaryText style={{ marginTop: 6 }}>
                  Select a theme to use when your device is on "light" mode:
                </SecondaryText>
                <InfoBlock justify="space-between">
                  {themes.map((item) => (
                    <PreviewTheme
                      key={item.id}
                      item={item}
                      selected={item.name === selectedLightTheme}
                      onPress={() => {
                        setSelectedLightTheme(item.name);
                      }}
                    />
                  ))}
                </InfoBlock>
                <SecondaryText style={{ marginTop: 12 }}>
                  Select a theme to use when your device is on "dark" mode:
                </SecondaryText>
                <InfoBlock justify="space-between">
                  {themes.map((item) => (
                    <PreviewTheme
                      key={item.id}
                      item={item}
                      selected={item.name === selectedDarkTheme}
                      onPress={() => {
                        setSelectedDarkTheme(item.name);
                      }}
                    />
                  ))}
                </InfoBlock>
              </GeneralContainer>
            )}
          </GeneralContainer>

          <DivisionLine />

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
        </GeneralContainer>
      </ScreenContainer>
    </Modal>
  );
};

export default ColorThemeModal;
