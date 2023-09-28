// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlZBHI9C7XLXOR7KqOuRYAK3Wy2gFLLxA",
  authDomain: "hairs-by-solomon.firebaseapp.com",
  projectId: "hairs-by-solomon",
  storageBucket: "hairs-by-solomon.appspot.com",
  messagingSenderId: "414934357112",
  appId: "1:414934357112:web:41e37d0b04595300c5098d",
  measurementId: "G-MTM1H5NNLT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);