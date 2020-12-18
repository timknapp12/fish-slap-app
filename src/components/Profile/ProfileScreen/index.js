import React, { useContext, useState, useEffect } from "react";
import { Alert, ActivityIndicator, Modal } from "react-native";
import {
  ScreenContainer,
  MainText,
  GeneralContainer,
  Avatar,
  H1,
  EditIcon,
  SaveIcon,
  CancelIcon,
  GeneralIcon,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <GeneralContainer height="100%" justify="flex-start">
          <GeneralContainer align="flex-end" direction="row">
            <CancelIcon onPress={() => setIsEditMode(false)} />
            <SaveIcon onPress={() => setIsEditMode(false)} />
          </GeneralContainer>
          <MainText>Edit Profile</MainText>
        </GeneralContainer>
      </ScreenContainer>
    );
  }
  return (
    <ScreenContainer>
      {/* MODAL */}
      <Modal animationType="slide" visible={isModalOpen}>
        <ScreenContainer>
          <GeneralContainer height="100%" justify="flex-start">
            <GeneralContainer align="flex-end" direction="row">
              <CancelIcon onPress={() => setIsModalOpen(false)} />
              <SaveIcon onPress={() => setIsModalOpen(false)} />
            </GeneralContainer>
            <MainText>Edit Profile Picture</MainText>
            <Avatar source={{ uri: selectedImage?.localUri ?? null }} />
            <GeneralContainer width="50%" direction="row">
              <GeneralIcon
                onPress={() => openImagePickerAsync(setSelectedImage)}
                name="image-outline"
              />
              <GeneralIcon
                name="camera-outline"
                onPress={() => openCamera(hasPermission, setSelectedImage)}
              />
            </GeneralContainer>
          </GeneralContainer>
          <TouchableOpacity onPress={saveImage}>
            <MainText>Save Photo</MainText>
          </TouchableOpacity>
        </ScreenContainer>
      </Modal>

      <GeneralContainer height="100%" justify="space-between">
        <GeneralContainer>
          <>
            <GeneralContainer align="flex-end">
              <EditIcon onPress={() => setIsEditMode(true)} />
            </GeneralContainer>
            <H1>{`${user.firstName} ${user.lastName}`}</H1>
            <GeneralContainer>
              <Avatar source={{ uri: selectedImage?.localUri ?? null }} />
              <GeneralContainer
                style={{ marginTop: -32 }}
                width="75%"
                align="flex-end"
              >
                <GeneralIcon
                  onPress={() => setIsModalOpen(true)}
                  name="image-plus"
                />
              </GeneralContainer>
            </GeneralContainer>
            <GeneralContainer padding={24}>
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
