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

export const uploadImage = async (image, imageName, uid) => {
  try {
    const response = await fetch(image.localUri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    await ref.put(blob);
    const downloadUrl = await ref.getDownloadURL();
    saveImageAsProfilePic(uid, downloadUrl);
  } catch (error) {
    console.log("error in upload:", error);
  }
};

// upload to profilePicture at firestore
const saveImageAsProfilePic = async (uid, url) => {
  const db = firebase.firestore();
  try {
    db.collection("users").doc(uid).update({ profilePicture: url });
  } catch (error) {
    console.log("error", error);
  }
};
