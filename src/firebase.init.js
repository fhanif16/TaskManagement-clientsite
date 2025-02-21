// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP8SHGg1Nn-pl-ck97Y8yV4r_oUiaDEys",
  authDomain: "taskmanager-4a2ae.firebaseapp.com",
  projectId: "taskmanager-4a2ae",
  storageBucket: "taskmanager-4a2ae.firebasestorage.app",
  messagingSenderId: "212585410908",
  appId: "1:212585410908:web:a392cdb02061f22e40d199"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);