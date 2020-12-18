import React from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import { green } from "../../styles/colors";
import PropTypes from "prop-types";
import { GeneralContainer } from "./Containers";

const ThemedIcon = styled(Ionicons)`
  /* if a color prop is given then it will overrule the theme prop */
  color: ${(props) => (props.color ? props.color : props.theme.color)};
  opacity: 0.8;
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

// GENERAL ICON
export const GeneralIcon = ({
  size = 30,
  name,
  color,
  onPress = () => {},
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    <ThemedIcon size={size} {...props} name={name} color={color} />
  </TouchableOpacity>
);

GeneralIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func,
};

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
    <ThemedIcon size={size} name="close-circle-outline" {...props} />
  </TouchableOpacity>
);
