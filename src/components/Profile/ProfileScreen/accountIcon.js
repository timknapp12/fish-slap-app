import React from "react";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";

const ThemedIcon = styled(Ionicons)`
  color: ${(props) => props.theme.color};
`;

const AccountIcon = ({ size = 300, ...props }) => (
  <ThemedIcon name="account-circle" size={size} {...props} />
);

export default AccountIcon;
