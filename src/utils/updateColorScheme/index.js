import * as firebase from "firebase";
import {
  lightTheme,
  midnightTheme,
  sunriseTheme,
  galaxyTheme,
} from "../../styles/themes";

const updateColorScheme = (colorScheme, user, setUpdateToFirebasePending) => {
  let newTheme;
  if (!user.theme.isSyncedToDevice) {
    newTheme = matchTheme(user.theme.defaultTheme);
    return saveThemeToDB(user, newTheme, setUpdateToFirebasePending);
  }
  if (user.theme.isSyncedToDevice) {
    newTheme =
      colorScheme === "light"
        ? matchTheme(user.theme.lightTheme)
        : matchTheme(user.theme.darkTheme);
    return saveThemeToDB(user, newTheme, setUpdateToFirebasePending);
  }
};
export default updateColorScheme;

const matchTheme = (themeName) => {
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
