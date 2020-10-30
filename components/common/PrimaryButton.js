import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue, green } from "../styles/colors";
import { LinearGradient } from "expo-linear-gradient";

const PrimaryButton = ({ children = "Button" }) => (
  <View style={styles.button}>
    <LinearGradient colors={[blue, green]} start={{ x: 0.3, y: 0.3 }}>
      <TouchableOpacity>
        <Text>{children}</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

export { PrimaryButton };

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "linear-gradient(blue, green)",
    width: "100%",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
