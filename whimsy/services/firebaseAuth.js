import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Alert } from "react-native";
import { useState } from "react";
import {createUserInDb} from "./firebaseDb";


//Register a user
export const registerNewUser = async (username, email, password, role) => {
  try {
    // Register the user using the provided email and password

    // After successful registration, create the user in the database
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create the user in the database with the provided role
    await createUserInDb(username, email, user.uid, role);

    console.log("User registered successfully");
  } catch (error) {
    console.log("Something went wrong during registration: " + error);
  }
};




//TODO: Sign In functionality
export const signInUser = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User: " + user.email)
        // Success Alert
        Alert.alert("You're in!", "You have successfully logged in.",[
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