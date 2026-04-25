import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrQM7xvEeijUs8AYKUHN9ZnMh_prTbj9Y",
  authDomain: "expense-tracker-90529.firebaseapp.com",
  projectId: "expense-tracker-90529",
  storageBucket: "expense-tracker-90529.firebasestorage.app",
  messagingSenderId: "463174179183",
  appId: "1:463174179183:web:dc16e6a05452080918709a",
  measurementId: "G-CEWC5Z5YWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Export Auth and DB for our project
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
