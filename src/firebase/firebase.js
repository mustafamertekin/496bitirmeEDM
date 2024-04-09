// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDxJLnLS9IIlEHvu_WK_99JKPrhUIJFxc",
  authDomain: "bitirme-35679.firebaseapp.com",
  databaseURL: "https://bitirme-35679-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "bitirme-35679",
  storageBucket: "bitirme-35679.appspot.com",
  messagingSenderId: "1012479053",
  appId: "1:1012479053:web:31a1a7cd893132b6d61804",
  measurementId: "G-YRRZ8QV58D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);