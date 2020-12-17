import React, { useContext, useState, useEffect } from "react";
import { Alert, ActivityIndicator } from "react-native";
import {
  ScreenContainer,
  MainText,
  GeneralContainer,
  Avatar,
  H1,
} from "../../common";
import AppContext from "../../../utils/AppContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import { themes } from "./colorThemes";
import {
  openImagePickerAsync,
  uploadImage,
  openCamera,
} from "./cameraFunctions";
import AccountIcon from "./accountIcon";

const ProfileScreen = () => {
  const { setTheme, user } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const saveImage = async () => {
    setIsLoadingImage(true);
    try {
      const response = await uploadImage(
        selectedImage,
        "testing 1234",
        user.uid
      );
      console.log("upload succesful");
      setIsLoadingImage(false);
      return response;
    } catch (error) {
      setIsLoadingImage(false);
      return Alert.alert(error);
    }
  };

  if (isLoadingImage) {
    return (
      <ScreenContainer>
        <GeneralContainer height="90px" justify="space-between">
          <ActivityIndicator size="large" />
          <MainText>Saving...</MainText>
        </GeneralContainer>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <H1>Profile Screen</H1>
      <GeneralContainer>
        {selectedImage ? (
          <>
            <Avatar source={{ uri: selectedImage.localUri }} />
            <TouchableOpacity
              onPress={() => openImagePickerAsync(setSelectedImage)}
            >
              <MainText>Upoad a different image</MainText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openCamera(hasPermission, setSelectedImage)}
            >
              <MainText>Take Photo</MainText>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveImage}>
              <MainText>Save Photo</MainText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <AccountIcon />
            <TouchableOpacity
              onPress={() => openImagePickerAsync(setSelectedImage)}
            >
              <MainText>Upoad image</MainText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openCamera(hasPermission, setSelectedImage)}
            >
              <MainText>Take Photo</MainText>
            </TouchableOpacity>
          </>
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
