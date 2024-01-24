// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_SENDER_ID}`,
  appId: `${import.meta.env.VITE_APP_ID}`
  // apiKey: 'AIzaSyBwPLfQZu8r6U81qv1eVTUIOYxtL7SJimQ',
  // authDomain: 'nethub-app.firebaseapp.com',
  // projectId: 'nethub-app',
  // storageBucket: 'nethub-app.appspot.com',
  // messagingSenderId: '678788284460',
  // appId: '1:678788284460:web:8f260499bc430b760bd189'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)