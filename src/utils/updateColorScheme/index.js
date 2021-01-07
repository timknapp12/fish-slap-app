import * as firebase from "firebase";
import {
  lightTheme,
  midnightTheme,
  sunriseTheme,
  galaxyTheme,
} from "../../styles/themes";

// This function takes a string (of the 4 theme types) and sets the current color theme according to settings in user theme object in the firebase cloud firestore and updates the currentTheme field back in the firestore database

const updateColorScheme = (colorScheme, user, setUpdateToFirebasePending) => {
  const newTheme = findTheme(colorScheme, user);
  saveThemeToDB(user, newTheme, setUpdateToFirebasePending);
};
export default updateColorScheme;

export const findTheme = (colorScheme, user) => {
  let newTheme;
  if (!user.theme.isSyncedToDevice) {
    newTheme = matchTheme(user.theme.defaultTheme);
    return newTheme;
  }
  if (user.theme.isSyncedToDevice) {
    newTheme =
      colorScheme === "light"
        ? matchTheme(user.theme.lightTheme)
        : matchTheme(user.theme.darkTheme);
    return newTheme;
  }
};

export const matchTheme = (themeName) => {
  switch (themeName) {
    case "lightTheme":
      return lightTheme;
      break;
    case "midnightTheme":
      return midnightTheme;
      break;
    case "sunriseTheme":
      return sunriseTheme;
      break;
    case "galaxyTheme":
      return galaxyTheme;
      break;
  }
};

const saveThemeToDB = (user, newTheme, setUpdateToFirebasePending) => {
  const data = {
    theme: { ...user.theme, currentTheme: newTheme },
  };
  const db = firebase.firestore();
  db.collection("users")
    .doc(user.uid)
    .update(data)
    .catch((error) => {
      Alert.alert(error);
    });
  setUpdateToFirebasePending(true);
};
