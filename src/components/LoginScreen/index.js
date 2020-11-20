import React, { useContext } from "react";
import { Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import { iosClientId, androidClientId } from "../../../config";
import AppContext from "../../utils/AppContext";
import {
  Input,
  PrimaryButton,
  SecondaryScreenContainer,
  MainText,
  H2,
} from "../common";
import { white, lightBlue } from "../../styles/colors";
import styled from "styled-components/native";

const LoginScreen = () => {
  const { loadingLogin, setLoadingLogin } = useContext(AppContext);

  const isUserEqual = (googleUser, firebaseUser) => {
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
    // console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            console.log("user signed in ");
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now(),
                })
                .then((snapshot) => {
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
          .catch((error) => {
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
    });
  };
  const signInWithGoogleAsync = async () => {
    setLoadingLogin(true);
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <SecondaryScreenContainer>
      {loadingLogin ? (
        <ActivityIndicator size="large" />
      ) : (
        <LoginContainer>
          <Button title="Sign In With Google" onPress={signInWithGoogleAsync} />
          <H2>OR</H2>
          <EmailContainer>
            <MainText>Sign in with email</MainText>
            <Input
              placeholder="email"
              textContentType="username"
              placeholderTextColor={lightBlue}
            />
            <Input
              placeholder="password"
              placeholderTextColor={lightBlue}
              textContentType="password"
              secureTextEntry={true}
            />
            <PrimaryButton>Login</PrimaryButton>
          </EmailContainer>
        </LoginContainer>
      )}
    </SecondaryScreenContainer>
  );
};

export default LoginScreen;

const LoginContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const EmailContainer = styled.View`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 150px;
  width: 75%;
  border: 1px solid ${white};
  border-radius: 2px;
`;
