// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKAqWauYrB7JORkeCpUPnq7n4BH4Jg2oA",
  authDomain: "techstudy-e7703.firebaseapp.com",
  projectId: "techstudy-e7703",
  storageBucket: "techstudy-e7703.firebasestorage.app",
  messagingSenderId: "168809016537",
  appId: "1:168809016537:web:9f4304705ff2374f04a2c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// Initialize Firebase Authentication and get a reference to the service