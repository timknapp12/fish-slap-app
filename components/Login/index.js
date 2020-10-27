import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";

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
    <View>
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
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default Login;
