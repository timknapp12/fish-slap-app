import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { PrimaryButton } from "../common";

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

  return (
    <View style={styles.container}>
      <PrimaryButton>Login</PrimaryButton>
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
