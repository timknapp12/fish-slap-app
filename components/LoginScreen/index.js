// import React, { useState } from "react";
// import { StyleSheet, Text, View, TextInput } from "react-native";
// import { PrimaryButton } from "../common";
// import * as Google from "expo-google-app-auth";

// // ios in google oauth credentials screen   https://www.youtube.com/watch?v=ZcaQJoXY-3Q
// const iosClientId =
//   "378539798943-j8jnl0lcob2e28odkncqmdbd9dph5u5g.apps.googleusercontent.com";
// const androidClientId =
//   "378539798943-gb6ks3bu5ac5pranmi31fup5291l6ses.apps.googleusercontent.com";

// const initialState = { email: "", password: "" };
// const LoginScreen = () => {
//   const [state, setState] = useState(initialState);
//   const handleTextInput = (name, text) => {
//     setState({
//       ...state,
//       [name]: text,
//     });
//   };
//   console.log("state", state);

//   const signInWithGoogleAsync = async () => {
//     try {
//       const result = await Google.logInAsync({
//         // behavior: "web",
//         androidClientId: androidClientId,
//         iosClientId: iosClientId,
//         scopes: ["profile", "email"],
//       });

//       if (result.type === "success") {
//         return result.accessToken;
//       } else {
//         return { cancelled: true };
//       }
//     } catch (e) {
//       return { error: true };
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <PrimaryButton onPress={signInWithGoogleAsync}>Login</PrimaryButton>
//       <View>
//         <TextInput
//           onChangeText={(text) => handleTextInput("email", text)}
//           type="email"
//           placeholder="Email address"
//         />
//         <TextInput
//           onChangeText={(text) => handleTextInput("password", text)}
//           secureTextEntry={true}
//           placeholder="Password"
//         />
//       </View>
//       <View>
//         <Text>{state.email}</Text>
//         <Text>{state.password}</Text>
//       </View>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from "firebase";
const iosClientId =
  "378539798943-j8jnl0lcob2e28odkncqmdbd9dph5u5g.apps.googleusercontent.com";
const androidClientId =
  "378539798943-gb6ks3bu5ac5pranmi31fup5291l6ses.apps.googleusercontent.com";
class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function (result) {
              console.log("user signed in ");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  })
                  .then(function (snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: androidClientId,
        // behavior: 'web',
        iosClientId: iosClientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign In With Google"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
