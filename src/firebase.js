// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmXPOl49M0Rtwmavpb3f6dzGSvdH3_DyY",
  authDomain: "insta2-bb83e.firebaseapp.com",
  databaseURL: "https://insta2-bb83e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "insta2-bb83e",
  storageBucket: "insta2-bb83e.appspot.com",
  messagingSenderId: "749297033663",
  appId: "1:749297033663:web:68b000188bd8eca24c410a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export  const store = getFirestore(app);
export default app