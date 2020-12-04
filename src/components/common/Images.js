import React from "react";
import { Image, StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Thumbnail = ({ source, ...props }) => (
  <Image style={styles.thumbnail} source={source} {...props} />
);

export const Avatar = ({ source, ...props }) => (
  <Image style={styles.avatar} source={source} {...props} />
);

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
