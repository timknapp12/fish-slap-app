import React from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import { green, lightPink } from "../../styles/colors";

const ThemedIcon = styled(Ionicons)`
  color: ${(props) => props.theme.color};
`;
// THUMBNAIL
export const Thumbnail = ({ source, ...props }) => {
  return (
    <>
      {source !== null ? (
        <Image style={styles.thumbnail} source={source} {...props} />
      ) : (
        <ThemedIcon name="account-circle" size={100} />
      )}
    </>
  );
};

// AVATAR
export const Avatar = ({ source, ...props }) => {
  return (
    <>
      {source.uri ? (
        <Image style={styles.avatar} source={source} {...props} />
      ) : (
        <ThemedIcon name="account-circle" size={300} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
    margin: 8,
  },
  avatar: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 150,
    margin: 4,
  },
});

// EDIT ICON
export const EditIcon = ({ size = 30, onPress = () => {}, ...props }) => (
  <TouchableOpacity onPress={onPress}>
    <ThemedIcon size={size} name="pencil" {...props} />
  </TouchableOpacity>
);

// SAVE ICON
export const SaveIcon = ({ size = 30, onPress = () => {}, ...props }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons
      size={size}
      name="checkbox-marked-circle-outline"
      color={green}
      {...props}
    />
  </TouchableOpacity>
);

// CANCEL ICON
export const CancelIcon = ({ size = 30, onPress = () => {}, ...props }) => (
  <TouchableOpacity onPress={onPress}>
    <ThemedIcon size={size} name="cancel" {...props} />
  </TouchableOpacity>
);
