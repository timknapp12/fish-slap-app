import React from "react";
import { useColorScheme } from "react-native";
import * as firebase from "firebase";

const updateColorScheme = () => {
  const colorScheme = useColorScheme() || "light";
  const user = firebase?.auth()?.currentUser;
  //   console.log("user", user);

  if (user) {
    const db = firebase.firestore();
    // const theme = db?.collection("users")?.doc("eke6QmalcWbHAIyTv9m4lOkpBDx2");

    // console.log("theme", theme);
    const docRef = db.collection("users").doc(user.uid);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
};

export default updateColorScheme;
