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
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { themes } from "./data";
import * as firebase from "firebase";

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

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openCamera = async () => {
    if (hasPermission === null) {
      Alert.alert("Permission to access camera is required!");
    }
    if (hasPermission === false) {
      Alert.alert("Permission to access camera is required!");
    }
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      uploadImage(result.uri, "test-image")
        .then(() => {
          console.log("uload successful");
        })
        .catch((error) => console.log("error", error));
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`images/${imageName}`);
    return ref.put(blob);
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
          <>
            <TouchableOpacity onPress={openImagePickerAsync}>
              <MainText>Upoad image</MainText>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
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
