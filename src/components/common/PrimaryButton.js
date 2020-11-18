import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue, green } from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

const PrimaryButton = ({ children = "Button", ...props }) => (
  <View style={styles.button}>
    <LinearGradient colors={[blue, green]} start={{ x: 0.49, y: 0.2 }}>
      <Container style={{ height: 24 }} {...props}>
        <Text style={styles.text}>{children}</Text>
      </Container>
    </LinearGradient>
  </View>
);

export { PrimaryButton };

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    // height: 24,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  text: {
    color: "#ffffff",
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
