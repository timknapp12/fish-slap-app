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
    </ScreenContainer>
  </Modal>
);

export default ProfilePicModal;
