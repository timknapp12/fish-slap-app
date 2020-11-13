import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./components/LoginScreen";
import LoadingScreen from "./components/LoadingScreen";
import DashboardScreen from "./components/DashboardScreen";

const Login = createStackNavigator();

export const LoginStack = () => {
  return (
    <Login.Navigator>
      <Login.Screen name="LoadingScreen" component={LoadingScreen} />
      <Login.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          gestureEnabled: false,
          headerLeft: () => {
            return null;
          },
        }}
      />
      <Login.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          gestureEnabled: false,
          headerLeft: () => {
            return null;
          },
        }}
      />
    </Login.Navigator>
  );
};
