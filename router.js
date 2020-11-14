import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import LoginScreen from "./components/LoginScreen";
import LoadingScreen from "./components/LoadingScreen";
import DashboardScreen from "./components/DashboardScreen";
import ProfileScreen from "./components/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "DashboardScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

const Login = createStackNavigator();

export const LoginStack = () => {
  return (
    <Login.Navigator>
      <Login.Screen name="LoadingScreen" component={LoadingScreen} />
      <Login.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Please Login",
          gestureEnabled: false,
          headerLeft: () => {
            return null;
          },
        }}
      />
      <Login.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerTitle: "Fish Slap App",
          gestureEnabled: false,
          headerLeft: () => {
            return null;
          },
        }}
      />
    </Login.Navigator>
  );
};
