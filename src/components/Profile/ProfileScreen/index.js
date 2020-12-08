import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
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
import { themes } from "./data";
import {
  openImagePickerAsync,
  uploadImage,
  openCamera,
} from "./cameraFunctions";

const ProfileScreen = () => {
  const { setTheme } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const saveImage = async () => {
    try {
      const response = await uploadImage(selectedImage, "testing 1234");
      console.log("upload succesful");
      return response;
    } catch (error) {
      Alert.alert(error);
    }
  };

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
