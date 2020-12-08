import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { Alert } from "react-native";

export const openImagePickerAsync = async (callback) => {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  if (pickerResult.cancelled === true) {
    return;
  }

  callback({ localUri: pickerResult.uri });
};

export const openCamera = async (hasPermission, callback) => {
  if (hasPermission === null) {
    Alert.alert("Permission to access camera is required!");
  }
  if (hasPermission === false) {
    Alert.alert("Permission to access camera is required!");
  }
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
  });
  if (!result.cancelled) {
    callback({ localUri: result.uri });
  }
};

export const uploadImage = async (image, imageName) => {
  try {
    const response = await fetch(image.localUri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    return ref.put(blob);
  } catch (error) {
    console.log("error", error);
  }
};
