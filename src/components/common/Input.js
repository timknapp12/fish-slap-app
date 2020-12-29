import React from "react";
import styled from "styled-components/native";
import { MainText } from "./Texts";
import { GeneralContainer } from "./Containers";
import PropTypes from "prop-types";

const StyledInput = styled.TextInput`
  width: 100%;
  padding: 4px;
  border: ${(props) => `1px solid ${props.theme.color}`};
  border-radius: 2px;
  color: ${(props) => props.theme.color};
`;

const Input = ({ label, ...props }) => {
  if (label) {
    return (
      <GeneralContainer style={{ marginTop: 4 }} align="flex-start">
        <MainText>{label}</MainText>
        <StyledInput {...props} />
      </GeneralContainer>
    );
  }
  return <StyledInput {...props} />;
};

Input.propTypes = {
  label: PropTypes.string,
};

export { Input };
