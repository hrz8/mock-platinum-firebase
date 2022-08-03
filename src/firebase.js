// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxExkbZ7k0QHim1Jb3i60fit3yK65aBT4",
  authDomain: "mock-platinum.firebaseapp.com",
  projectId: "mock-platinum",
  storageBucket: "mock-platinum.appspot.com",
  messagingSenderId: "826990297618",
  appId: "1:826990297618:web:a2536c973e9051e774cecb",
  databaseURL: "https://mock-platinum-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);
