import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Add this line

const firebaseConfig = {
  apiKey: "AIzaSyBYBxcUfd6oNt2rg7AwraF_IF8DWE9DY1k",
  authDomain: "hackademy-labs.firebaseapp.com",
  projectId: "hackademy-labs",
  storageBucket: "hackademy-labs.appspot.com",
  messagingSenderId: "724362471177",
  appId: "1:724362471177:web:3099173d47f964524455d8",
  measurementId: "G-K8TBNJ7L7B",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- Add this line
export const provider = new GoogleAuthProvider();
export { signInWithPopup, signOut };
