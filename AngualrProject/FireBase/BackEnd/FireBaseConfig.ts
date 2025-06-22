
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// Import GoogleAIBackend and getAI, getGenerativeModel from the appropriate package
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const firebaseConfig = {
      apiKey: "AIzaSyDKAqWauYrB7JORkeCpUPnq7n4BH4Jg2oA",
      authDomain: "techstudy-e7703.firebaseapp.com",
      projectId: "techstudy-e7703",
      storageBucket: "techstudy-e7703.appspot.com",
      messagingSenderId: "168809016537",
      appId: "1:168809016537:web:9f4304705ff2374f04a2c8"
};

const blogAPIKey = 'AIzaSyA-_ZZbY_nHxq9YqfLwP45eaGVGiuEqitI';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AI = getAI(app, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(AI, { model: "gemini-2.0-flash" });
const db = getFirestore(app);


export { auth,AI,model,app, provider, signInWithPopup, db, doc, setDoc, getDoc };
