import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBfF0JF_aP2jGLjLQb4Lrwo-Ethz270u7E",
    authDomain: "ast-16e7a.firebaseapp.com",
    projectId: "ast-16e7a",
    storageBucket: "ast-16e7a.firebasestorage.app",
    messagingSenderId: "1099315575499",
    appId: "1:1099315575499:web:52a66e57623205be2eb94e",
    measurementId: "G-X8GZP9E49V"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, signInWithPopup, getDoc, setDoc, doc };
