// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpR9WFAz340z9OUvRnjBXc2yUhK5sd1ng",
  authDomain: "imagegallery-256b0.firebaseapp.com",
  projectId: "imagegallery-256b0",
  storageBucket: "imagegallery-256b0.appspot.com",
  messagingSenderId: "559869373718",
  appId: "1:559869373718:web:2c1d6ba29ff619edf6f437",
  measurementId: "G-DJDSTQ8BHY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
