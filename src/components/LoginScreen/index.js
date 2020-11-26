import React, { useContext, useState } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import { iosClientId, androidClientId, faceBookAppId } from "../../../config";
import * as Facebook from "expo-facebook";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import AppContext from "../../utils/AppContext";
import {
  Input,
  PrimaryButton,
  SecondaryButton,
  SecondaryScreenContainer,
  MainText,
  H2,
  LoginButton,
  GeneralContainer,
} from "../common";
import { white, lightBlue } from "../../styles/colors";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = () => {
  const { loadingLogin, setLoadingLogin } = useContext(AppContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  const signUpUser = (firstName, lastName, email, password) => {
    try {
      if (password.length < 6) {
        alert("Please use at least 6 characters for the password");
        return;
      }
      if (firstName.length < 1) {
        alert("Please enter your first name");
        return;
      }
      if (lastName.length < 1) {
        alert("Please enter your last name");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error", error.toString());
    }
  };

  const loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => console.log("user", user));
    } catch (error) {
      console.log("error", error.toString());
    }
  };

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

  // const loginFB = async () => {
  //   try {
  //     await Facebook.initializeAsync({
  //       appId: faceBookAppId,
  //     });
  //     const {
  //       type,
  //       token,
  //       expirationDate,
  //       permissions,
  //       declinedPermissions,
  //     } = await Facebook.logInWithReadPermissionsAsync({
  //       permissions: ["public_profile"],
  //     });
  //     if (type === "success") {
  //       // Get the user's name using Facebook's Graph API
  //       const response = await fetch(
  //         `https://graph.facebook.com/me?access_token=${token}`
  //       );
  //       console.log("Logged in!", `Hi ${(await response.json()).name}!`);
  //       const credential = firebase.auth.FacebookAuthProvider.credential(token);
  //       console.log("credential", credential);
  //       firebase
  //         .auth()
  //         .signInWithCredential(credential)
  //         .catch((error) => {
  //           console.log("this is my error", error);
  //         });
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     console.log(`Facebook Login Error: ${message}`);
  //   }
  // };

  return (
    <SecondaryScreenContainer>
      {loadingLogin ? (
        <ActivityIndicator size="large" />
      ) : (
        <LoginContainer>
          {!newAccount ? (
            <>
              <GeneralContainer width="80%" padding="8px" height="40px">
                {/* <LoginButton title="Facebook" onPress={loginFB} /> */}
                <LoginButton onPress={signInWithGoogleAsync} />
              </GeneralContainer>
              <GeneralContainer padding="8px">
                <H2>OR</H2>
              </GeneralContainer>
              <EmailContainer newAccount={newAccount}>
                <MainText>Sign in with email</MainText>
                <Input
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="email"
                  textContentType="username"
                  placeholderTextColor={lightBlue}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <Input
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="password"
                  placeholderTextColor={lightBlue}
                  textContentType="newPassword"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <PrimaryButton onPress={() => loginUser(email, password)}>
                  Login
                </PrimaryButton>
              </EmailContainer>
              <GeneralContainer justify="flex-end" width="80%" height="66px">
                <MainText>Don't have an account?</MainText>
                <SecondaryButton onPress={() => setNewAccount(true)}>
                  Sign Up Here
                </SecondaryButton>
              </GeneralContainer>
            </>
          ) : (
            <>
              <EmailContainer newAccount={newAccount}>
                <MainText>Create a new account</MainText>
                <Input
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  placeholder="first name"
                  textContentType="givenName"
                  placeholderTextColor={lightBlue}
                />
                <Input
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  placeholder="last name"
                  textContentType="familyName"
                  placeholderTextColor={lightBlue}
                />
                <Input
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="email"
                  textContentType="username"
                  placeholderTextColor={lightBlue}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <Input
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="password"
                  placeholderTextColor={lightBlue}
                  textContentType="password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <PrimaryButton
                  onPress={() =>
                    signUpUser(firstName, lastName, email, password)
                  }
                >
                  Create Account
                </PrimaryButton>
              </EmailContainer>
              <GeneralContainer padding="16px">
                <TouchableOpacity onPress={() => setNewAccount(false)}>
                  <Ionicons name="arrow-left-circle" color="white" size={42} />
                </TouchableOpacity>
              </GeneralContainer>
            </>
          )}
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
  align-items: center;
  justify-content: space-around;
  height: ${(props) => (props.newAccount ? "300px" : "222px")};
  width: 75%;
  border: 1px solid ${white};
  border-radius: 2px;
`;
