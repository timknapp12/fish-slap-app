import React from "react";
import { Modal } from "react-native";
import {
  ScreenContainer,
  GeneralContainer,
  Avatar,
  H2,
  SaveIcon,
  CancelIcon,
  GeneralIcon,
  MainText,
} from "../common";

const ProfilePicModal = ({
  setIsModalOpen,
  openCamera,
  hasPermission,
  openImagePickerAsync,
  isModalOpen,
  selectedImage,
  setSelectedImage,
  saveImage,
  initialUrl,
}) => (
  <Modal animationType="slide" visible={isModalOpen}>
    <ScreenContainer>
      <GeneralContainer height="100%" justify="flex-start">
        <GeneralContainer align="flex-end" direction="row">
          <CancelIcon
            onPress={() => {
              setIsModalOpen(false);
              setSelectedImage(initialUrl);
            }}
          />
          <SaveIcon onPress={saveImage} />
        </GeneralContainer>
        <H2>Edit Profile Picture</H2>
        <Avatar source={{ uri: selectedImage?.localUri ?? null }} />

        <GeneralContainer width="50%" direction="row" justify="center">
          <GeneralContainer>
            <GeneralIcon
              onPress={() => openImagePickerAsync(setSelectedImage)}
              name="image-outline"
            />
            <MainText>Upload Photo</MainText>
          </GeneralContainer>

          <GeneralContainer>
            <GeneralIcon
              name="camera-outline"
              onPress={() => openCamera(hasPermission, setSelectedImage)}
            />
            <MainText>Take Photo</MainText>
          </GeneralContainer>
        </GeneralContainer>
      </GeneralContainer>
    </ScreenContainer>
  </Modal>
);

export default ProfilePicModal;
