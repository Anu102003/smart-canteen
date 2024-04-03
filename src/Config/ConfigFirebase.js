
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdY5bdoKoFnxDLoNyQANKv7mR8JLMhFnA",
  authDomain: "smart-canteen-8867b.firebaseapp.com",
  projectId: "smart-canteen-8867b",
  storageBucket: "smart-canteen-8867b.appspot.com",
  messagingSenderId: "568097945323",
  appId: "1:568097945323:web:65d6db5bee8896b6dff0ae"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


 
