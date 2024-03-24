// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfigSetting = {
  apiKey: "AIzaSyAeT2Vjg6EuJt-r9Zb8C8UVw-G2NTAyFLA",
  authDomain: "messenger-mate-dd83f.firebaseapp.com",
  projectId: "messenger-mate-dd83f",
  storageBucket: "messenger-mate-dd83f.appspot.com",
  messagingSenderId: "534853645660",
  appId: "1:534853645660:web:010f40519fd5944ad23d99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfigSetting);
export const loginDetails = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const fireStoreDb = getFirestore(app);