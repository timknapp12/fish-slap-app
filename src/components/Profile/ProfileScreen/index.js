import React, { useContext, useState, useEffect } from "react";
import * as firebase from "firebase";
import styled from "styled-components/native";
import { Alert } from "react-native";
import {
  ScreenContainer,
  MainText,
  GeneralContainer,
  Avatar,
  H1,
  EditIcon,
  GeneralIcon,
  Spinner,
} from "../../common";
import AppContext from "../../../utils/AppContext";
import { Camera } from "expo-camera";
import {
  openImagePickerAsync,
  uploadImage,
  openCamera,
} from "./cameraFunctions";
import ProfilePicModal from "../ProfilePicModal";
import UserInfoModal from "../UserInfoModal";
import ColorThemeModal from "../ColorThemeModal";

const InfoBlock = styled(GeneralContainer)`
  position: relative;
  padding: 4px 0;
  margin-top: 20px;
  border-color: ${(props) => props.theme.color};
  border-width: 0.5px;
  border-radius: 4px;
`;

const IconContainerAbsolute = styled(GeneralContainer)`
  position: absolute;
  top: 2px;
  right: 2px;
`;

const ProfileScreen = () => {
  const { theme, user, setUpdateToFirebasePending } = useContext(AppContext);
  const {
    firstName = "",
    lastName = "",
    email = "",
    username = "",
    uid,
    profilePicture,
  } = user;

  const initialUrl = profilePicture && { localUri: profilePicture };
  const [selectedImage, setSelectedImage] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditTheme, setIsEditTheme] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const initialInfo = {
    firstName,
    lastName,
    username,
  };
  const [userInfo, setUserInfo] = useState(initialInfo);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // to make sure user data does not persist when new person logs in
  useEffect(() => {
    setSelectedImage(initialUrl);
    return () => {
      setSelectedImage(null);
    };
  }, [user]);

  const saveUserData = (data) => {
    if (data.username.length < 1) {
      Alert.alert("Please enter your username");
      return;
    }
    if (data.firstName.length < 1) {
      Alert.alert("Please enter your first name");
      return;
    }
    if (data.lastName.length < 1) {
      Alert.alert("Please enter your last name");
      return;
    }
    const db = firebase.firestore();
    db.collection("users")
      .doc(uid)
      .update(data)
      .then(() => setIsEditMode(false))
      .catch((error) => {
        Alert.alert(error);
      });
    setUpdateToFirebasePending(true);
  };

  const saveImage = async () => {
    const date = Date.now();
    const imageName = `.startOfImageName.${firstName}.${lastName}.${uid}.${date}.endOfImageName.`;
    if (!selectedImage) {
      Alert.alert("Please select an image");
      return;
    }
    setIsLoadingImage(true);
    try {
      const response = await uploadImage(
        selectedImage,
        imageName,
        user,
        setUploadPercentage
      );
      setIsLoadingImage(false);
      setIsModalOpen(false);
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
          <Spinner />
          <MainText>Saving...</MainText>
          <MainText>{`${uploadPercentage}%`}</MainText>
        </GeneralContainer>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ProfilePicModal
        setIsModalOpen={setIsModalOpen}
        openCamera={openCamera}
        hasPermission={hasPermission}
        openImagePickerAsync={openImagePickerAsync}
        isModalOpen={isModalOpen}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        saveImage={saveImage}
        initialUrl={initialUrl}
      />

      <UserInfoModal
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        setUserInfo={setUserInfo}
        saveUserData={saveUserData}
        initialInfo={initialInfo}
        userInfo={userInfo}
      />

      <ColorThemeModal
        isEditTheme={isEditTheme}
        setIsEditTheme={setIsEditTheme}
      />

      <GeneralContainer height="100%" justify="flex-start">
        <GeneralContainer>
          <H1>Profile</H1>
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
        </GeneralContainer>
        <InfoBlock>
          <IconContainerAbsolute align="flex-end">
            <EditIcon onPress={() => setIsEditMode(true)} />
          </IconContainerAbsolute>
          <MainText>{`First Name: ${firstName}`}</MainText>
          <MainText>{`First Name: ${lastName}`}</MainText>
          <MainText>{`Username: ${username ?? "n/a"}`}</MainText>
          <MainText>{`Email: ${email}`}</MainText>
        </InfoBlock>
        <InfoBlock>
          <IconContainerAbsolute align="flex-end">
            <EditIcon onPress={() => setIsEditTheme(true)} />
          </IconContainerAbsolute>
          <MainText>{`Color Theme: ${theme.name}`}</MainText>
        </InfoBlock>
      </GeneralContainer>
    </ScreenContainer>
  );
};

export default ProfileScreen;
