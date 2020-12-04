import React, { useContext, useState } from "react";
import { StyleSheet, Image } from "react-native";
import {
  ScreenContainer,
  MainText,
  GeneralContainer,
  Avatar,
  H1,
} from "../../common";
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

  return (
    <ScreenContainer>
      <H1>Profile Screen</H1>
      <GeneralContainer>
        {selectedImage ? (
          <>
            <Avatar source={{ uri: selectedImage.localUri }} />
            <TouchableOpacity onPress={openImagePickerAsync}>
              <MainText>Upoad a different image</MainText>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={openImagePickerAsync}>
            <MainText>Upoad image</MainText>
          </TouchableOpacity>
        )}
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
