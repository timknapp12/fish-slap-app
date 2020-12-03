import React, { useContext, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { ScreenContainer, MainText, GeneralContainer } from "../../common";
import AppContext from "../../../utils/AppContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { themes } from "./data";

const ProfileScreen = () => {
  const { setTheme } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };
  if (selectedImage !== null) {
    return (
      <GeneralContainer>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </GeneralContainer>
    );
  }
  return (
    <ScreenContainer>
      <MainText>Profile Screen</MainText>
      <GeneralContainer>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <MainText>Upoad image</MainText>
        </TouchableOpacity>
      </GeneralContainer>

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

const styles = StyleSheet.create({
  /* Other styles hidden to keep the example brief... */
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
