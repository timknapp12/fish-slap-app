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

// NORMAL FONT
export const NormalText = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 16px;
  font-weight: normal;
`;

// SECONDARY TEXT
export const SecondaryText = styled.Text`
  color: ${(props) => props.theme.secondaryColor};
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 2.5px;
  font-style: italic;
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
