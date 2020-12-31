import React from "react";
import { Modal } from "react-native";
import {
  ScreenContainer,
  GeneralContainer,
  Input,
  H2,
  SaveIcon,
  CancelIcon,
  GeneralIcon,
} from "../common";

const UserInfoModal = ({
  isEditMode,
  setIsEditMode,
  setUserInfo,
  saveUserData,
  initialInfo,
  userInfo,
}) => (
  <Modal animationType="slide" visible={isEditMode}>
    <ScreenContainer>
      <GeneralContainer height="100%" justify="flex-start">
        <GeneralContainer align="flex-end" direction="row">
          <CancelIcon
            onPress={() => {
              setIsEditMode(false);
              setUserInfo(initialInfo);
            }}
          />
          <SaveIcon onPress={() => saveUserData(userInfo)} />
        </GeneralContainer>
        <H2>Edit Profile</H2>
        <GeneralContainer>
          <Input
            label="Username*"
            placeholder="username"
            value={userInfo.username}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, username: text })
            }
          />
          <Input
            label="First Name*"
            placeholder="first name"
            value={userInfo.firstName}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, firstName: text })
            }
          />
          <Input
            label="Last Name*"
            placeholder="last name"
            value={userInfo.lastName}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, lastName: text })
            }
          />
        </GeneralContainer>
      </GeneralContainer>
    </ScreenContainer>
  </Modal>
);

export default UserInfoModal;
