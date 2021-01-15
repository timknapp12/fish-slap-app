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

// INVERTED MAIN
export const InvertedMainText = styled.Text`
  ${sharedCss};
  color: ${(props) => props.theme.linearGradientOne};
  font-size: 16px;
`;

// SECONDARY
export const SecondaryText = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 16px;
  font-weight: normal;
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
