import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import AppContext from "../../utils/AppContext";

const DashboardScreen = () => {
  const { setLoadingLogin } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <Text>DashboardScreen</Text>
      <Button
        title="Sign out"
        onPress={() => {
          firebase.auth().signOut();
          setLoadingLogin(false);
        }}
      />
    </View>
  );
};
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
