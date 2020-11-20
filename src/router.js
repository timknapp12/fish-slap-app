import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import LoginScreen from "./components/LoginScreen";
import LoadingScreen from "./components/LoadingScreen";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/Profile/ProfileScreen";
import FriendsScreen from "./components/Friends/FriendsScreen";
import GesturesScreen from "./components/Gestures/GesturesScreen";
import { lightBlue, darkBlue, black } from "./styles/colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "Friends") {
            iconName = focused
              ? "account-multiple"
              : "account-multiple-outline";
          } else if (route.name === "Gestures") {
            iconName = focused ? "hand-peace" : "hand";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: lightBlue,
        activeBackgroundColor: darkBlue,
        inactiveBackgroundColor: black,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Gestures"
        component={GesturesScreen}
        options={{ title: "Gestures" }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{ title: "Friends" }}
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
    <Login.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
