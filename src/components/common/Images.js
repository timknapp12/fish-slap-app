import React from "react";
import { Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";

const ThemedIcon = styled(Ionicons)`
  color: ${(props) => props.theme.color};
`;

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
