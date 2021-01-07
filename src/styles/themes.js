import {
  blue,
  pink,
  lightBlue,
  black,
  darkBlue,
  white,
  yellow,
  orange,
} from "./colors";

export const lightTheme = {
  id: 1,
  name: "lightTheme",
  displayName: "Light Theme",
  color: blue,
  linearGradientOne: white,
  linearGradientTwo: white,
  activeBackground: blue,
  inactiveBackground: white,
  activeTint: white,
  inactiveTint: blue,
  statusBar: "dark-content",
};

export const midnightTheme = {
  id: 2,
  name: "midnightTheme",
  displayName: "Midnight Theme",
  color: white,
  linearGradientOne: darkBlue,
  linearGradientTwo: black,
  activeBackground: darkBlue,
  inactiveBackground: black,
  activeTint: white,
  inactiveTint: lightBlue,
  statusBar: "light-content",
};

export const sunriseTheme = {
  id: 3,
  name: "sunriseTheme",
  displayName: "Sunrise Theme",
  color: black,
  linearGradientOne: yellow,
  linearGradientTwo: orange,
  activeBackground: yellow,
  inactiveBackground: orange,
  activeTint: black,
  inactiveTint: white,
  statusBar: "dark-content",
};

export const galaxyTheme = {
  id: 4,
  name: "galaxyTheme",
  displayName: "Galaxy Theme",
  color: white,
  linearGradientOne: pink,
  linearGradientTwo: darkBlue,
  activeBackground: pink,
  inactiveBackground: darkBlue,
  activeTint: white,
  inactiveTint: lightBlue,
  statusBar: "light-content",
};
