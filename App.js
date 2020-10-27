import React, {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import firebase from "firebase";
import { StyleSheet, Text, View } from 'react-native';

// green = 43cc59
// blue = 1982dd
// pink = e84b87

const App = () => {
  useEffect(() => {
    return () => {
      firebase.initializeApp({
        apiKey: "AIzaSyAaAx1hViJfLvORttND4LNmiuDniQjw38U",
        authDomain: "fish-slap-app.firebaseapp.com",
        databaseURL: "https://fish-slap-app.firebaseio.com",
        projectId: "fish-slap-app",
        storageBucket: "",
        messagingSenderId: "378539798943",
        appId: "1:378539798943:web:3fce6e2e8655c0cf",
      });
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Hello People!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;