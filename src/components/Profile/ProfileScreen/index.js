import React, { useContext } from "react";
import { ScreenContainer, MainText, GeneralContainer } from "../../common";
import AppContext from "../../../utils/AppContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  lightTheme,
  midnightTheme,
  sunriseTheme,
  galaxyTheme,
} from "../../../styles/themes";

const themes = [
  { id: 1, name: lightTheme, displayName: "Light Theme" },
  { id: 2, name: midnightTheme, displayName: "Midnight Theme" },
  { id: 3, name: sunriseTheme, displayName: "Sunrise Theme" },
  { id: 4, name: galaxyTheme, displayName: "Galaxy Theme" },
];

const ProfileScreen = () => {
  const { setTheme } = useContext(AppContext);
  return (
    <ScreenContainer>
      <MainText>Profile Screen</MainText>
      <GeneralContainer padding={16}>
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
    </ScreenContainer>
  );
};

export default ProfileScreen;
