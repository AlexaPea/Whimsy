// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa92PHBy0Ihf_52EtYh_l6eV13l9c3dUw",
  authDomain: "whimsy-1d667.firebaseapp.com",
  projectId: "whimsy-1d667",
  storageBucket: "whimsy-1d667.appspot.com",
  messagingSenderId: "459757932488",
  appId: "1:459757932488:web:04a03fc6e224300c2e3afd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication Functionality
export const auth = getAuth(app);
export const db = getFirestore(app);