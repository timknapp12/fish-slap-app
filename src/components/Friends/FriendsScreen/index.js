import React from "react";
import { Text, View, StyleSheet } from "react-native";

const FriendsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Friends Screen</Text>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
