import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Alert } from "react-native";
import { useState } from "react";
import {createUserInDb} from "./firebaseDb";


//TODO: Register a user
export const registerNewUser = (username, email, password) =>{
createUserWithEmailAndPassword(auth, email, password)
.then( async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("New User " + user)
    updateAuthProfile(username);
    // Create user in db
    await createUserInDb(username, email, user.uid)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + ": " + errorMessage)
  });
}



//TODO: Sign In functionality
export const signInUser = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User: " + user.email)
        // Success Alert
        Alert.alert("You're in!", "You hace successfully logged in.",[
            {text: 'Thanks', onPress: () => {}}
          ])
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage)
        Alert.alert("Try again", "Error",[
            {text: 'Try Again', onPress: () => {}}
          ])
    });
};

//TODO: Sign Out functionality
export const signOutUser = () =>{
    signOut(auth)
    .then(() => {
        console.log("Logged Out successfully")
    }).catch((error) => {
        console.log(error.errorMessage)
    })
}

//Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
}

const updateAuthProfile = (username) => {
        updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
}