// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCFqNUHaLEB-ZGv1dy50dxleznMjRY6TIY",
  authDomain: "quanlyxephang.firebaseapp.com",
  projectId: "quanlyxephang",
  storageBucket: "quanlyxephang.appspot.com",
  messagingSenderId: "198520902648",
  appId: "1:198520902648:web:c6f6994c1dc5522485bc0d",
  measurementId: "G-14TLSP34H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export {database};