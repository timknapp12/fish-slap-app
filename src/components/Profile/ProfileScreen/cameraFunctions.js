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
    const uploadTask = ref.put(blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("error", error);
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          return saveImageAsProfilePic(uid, downloadUrl);
        });
      }
    );
    await uploadTask;
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
