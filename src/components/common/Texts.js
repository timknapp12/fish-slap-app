import styled from "styled-components/native";

const sharedCss = {
  fontWeight: "bold",
};

// MAIN
export const MainText = styled.Text`
  ${sharedCss};
  color: ${(props) => props.theme.color};
  font-size: 16px;
`;

// MAIN HEADING
export const H1 = styled.Text`
  ${sharedCss};
  color: ${(props) => props.theme.color};
  font-size: 24px;
`;

// H2
export const H2 = styled.Text`
  ${sharedCss};
  color: ${(props) => props.theme.color};
  font-size: 20px;
`;
