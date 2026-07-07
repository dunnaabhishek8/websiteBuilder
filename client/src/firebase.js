// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-5cc04.firebaseapp.com",
  projectId: "genwebai-5cc04",
  storageBucket: "genwebai-5cc04.firebasestorage.app",
  messagingSenderId: "730457149991",
  appId: "1:730457149991:web:e88869dffad84d54bf3402"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)

const provider=new GoogleAuthProvider()

export {auth,provider}