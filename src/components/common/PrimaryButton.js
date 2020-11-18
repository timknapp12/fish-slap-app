import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue, green } from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";

const PrimaryButton = ({ children = "Button", ...props }) => (
  <View style={styles.button}>
    <LinearGradient colors={[blue, green]} start={{ x: 0.49, y: 0.2 }}>
      <TouchableOpacity {...props}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

export { PrimaryButton };

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
  },
});
