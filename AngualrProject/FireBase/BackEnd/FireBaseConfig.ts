import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: FirebaseApp;
  auth: ReturnType<typeof getAuth>;
  firestore: ReturnType<typeof getFirestore>;
  aiLogics: ReturnType<typeof getAI>;
  model: ReturnType<typeof getGenerativeModel>;
  db: ReturnType<typeof getFirestore>;
  constructor() {
    this.app = initializeApp({
      apiKey: "AIzaSyDKAqWauYrB7JORkeCpUPnq7n4BH4Jg2oA",
      authDomain: "techstudy-e7703.firebaseapp.com",
      projectId: "techstudy-e7703",
      storageBucket: "techstudy-e7703.appspot.com",
      messagingSenderId: "168809016537",
      appId: "1:168809016537:web:9f4304705ff2374f04a2c8"
    });
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.aiLogics = getAI(this.app, { backend: new GoogleAIBackend() });
    this.model = getGenerativeModel(this.aiLogics, { model: "gemini-2.0-flash" });
    this.db = getFirestore(this.app);




    
  }

}
