import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import AppContext from "../../utils/AppContext";

const Spinner = ({ size = "large", color, ...props }) => {
  const { theme } = useContext(AppContext);
  return (
    <ActivityIndicator
      size={size}
      color={color ? color : theme.color}
      {...props}
    />
  );
};

export { Spinner };
