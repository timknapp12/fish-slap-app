import React from "react";
import TestRenderer from "react-test-renderer";
import { View, Text } from "react-native";
import { useToggle } from "./";

const MyComponent = () => {
  const [open, toggle] = useToggle(false);
  return (
    <View>
      <SubComponent onPress={toggle} open={open} foo="bar" />
      <Text className="my">Hello</Text>
    </View>
  );
};

const SubComponent = () => {
  return <Text>Toggle</Text>;
};

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;
describe("test useToggle", () => {
  test("test component props", () => {
    expect(testInstance.findByType(SubComponent).props.foo).toBe("bar");
    expect(testInstance.findByType(SubComponent).props.open).toBe(false);
  });
  test("test that open prop toggles", () => {
    testInstance.findByType(SubComponent).props.onPress();
    expect(testInstance.findByType(SubComponent).props.open).toBe(true);
    testInstance.findByType(SubComponent).props.onPress();
    expect(testInstance.findByType(SubComponent).props.open).toBe(false);
  });
});
