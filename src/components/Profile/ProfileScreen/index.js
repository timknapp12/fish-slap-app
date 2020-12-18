import React, { useContext, useState, useEffect } from "react";
import { Alert, ActivityIndicator } from "react-native";
import {
  ScreenContainer,
  MainText,
  GeneralContainer,
  Avatar,
  H1,
  EditIcon,
  SaveIcon,
  CancelIcon,
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

const ProfileScreen = () => {
  const { setTheme, theme, user } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  console.log("theme", theme);
  console.log("isEditMode", isEditMode);

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

  if (isEditMode) {
    return (
      <ScreenContainer>
        <GeneralContainer height="100%" justify="space-between">
          <GeneralContainer align="flex-end" style={{ flexDirection: "row" }}>
            <CancelIcon />
            <SaveIcon onPress={() => setIsEditMode(true)} />
          </GeneralContainer>
          <Avatar source={{ uri: selectedImage?.localUri ?? null }} />
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
          <TouchableOpacity onPress={saveImage}>
            <MainText>Save Photo</MainText>
          </TouchableOpacity>
        </GeneralContainer>
      </ScreenContainer>
    );
  }
  return (
    <ScreenContainer>
      <GeneralContainer height="100%" justify="space-between">
        <GeneralContainer>
          <>
            <GeneralContainer align="flex-end">
              <EditIcon onPress={() => setIsEditMode(true)} />
            </GeneralContainer>
            <H1>{`${user.firstName} ${user.lastName}`}</H1>
            <Avatar source={{ uri: selectedImage?.localUri ?? null }} />
            <GeneralContainer padding={8}>
              <MainText>{`Email: ${user.email}`}</MainText>
              <MainText>{`Username: ${user.username ?? "n/a"}`}</MainText>
              <MainText>{`Color Theme: ${theme.name}`}</MainText>
            </GeneralContainer>
          </>
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
      </GeneralContainer>
    </ScreenContainer>
  );
};

export default ProfileScreen;
