// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-01-1e741.firebaseapp.com",
  projectId: "mern-blog-01-1e741",
  storageBucket: "mern-blog-01-1e741.appspot.com",
  messagingSenderId: "608593668275",
  appId: "1:608593668275:web:f410f1e9c1ade6a58528c6",
  measurementId: "G-T8G0CT0HBC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);