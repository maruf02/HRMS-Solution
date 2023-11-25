// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const vite_key = import.meta.env.VITE_apiKey;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDct1p3-Ea-z-Z_WyNARzkHOu0E4RJk3_s",
  authDomain: "hrms-solution.firebaseapp.com",
  projectId: "hrms-solution",
  storageBucket: "hrms-solution.appspot.com",
  messagingSenderId: "125408720864",
  appId: "1:125408720864:web:19a9b5ecaa9b153d875d85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
