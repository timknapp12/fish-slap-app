import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import LoginScreen from "./components/LoginScreen";
import LoadingScreen from "./components/LoadingScreen";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/Profile/ProfileScreen";
import FriendsScreen from "./components/Friends/FriendsScreen";
import ActivityScreen from "./components/Activity/ActivityScreen";

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
          } else if (route.name === "Activity") {
            iconName = focused ? "comment-text" : "comment-text-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ title: "Activity" }}
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
