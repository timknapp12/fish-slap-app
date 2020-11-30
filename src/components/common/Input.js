import React from "react";
import { white } from "../../styles/colors";
import styled from "styled-components/native";

const Input = ({ ...props }) => {
  return <StyledInput color={props.color} {...props} />;
};

export { Input };

const StyledInput = styled.TextInput`
  width: 100%;
  padding: 4px;
  border: 1px solid ${white};
  border-radius: 2px;
  color: ${(props) => (props.color ? props.color : white)};
`;
