import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { PrimaryButton } from "../common";
import * as Google from "expo-google-app-auth";

// ios in google oauth credentials screen   https://www.youtube.com/watch?v=ZcaQJoXY-3Q
const iosClientId =
  "378539798943-j8jnl0lcob2e28odkncqmdbd9dph5u5g.apps.googleusercontent.com";
const androidClientId =
  "378539798943-gb6ks3bu5ac5pranmi31fup5291l6ses.apps.googleusercontent.com";

const initialState = { email: "", password: "" };
const Login = () => {
  const [state, setState] = useState(initialState);
  const handleTextInput = (name, text) => {
    setState({
      ...state,
      [name]: text,
    });
  };
  console.log("state", state);

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // behavior: "web",
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <View style={styles.container}>
      <PrimaryButton onPress={signInWithGoogleAsync}>Login</PrimaryButton>
      <View>
        <TextInput
          onChangeText={(text) => handleTextInput("email", text)}
          type="email"
          placeholder="Email address"
        />
        <TextInput
          onChangeText={(text) => handleTextInput("password", text)}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <View>
        <Text>{state.email}</Text>
        <Text>{state.password}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
