import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { lightBlue } from "../../styles/colors";

const Input = ({ ...props }) => {
  return <TextInput style={styles.input} {...props} />;
};

export { Input };

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: lightBlue,
  },
});
