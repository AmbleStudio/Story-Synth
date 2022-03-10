import firebase from "firebase/compat/app";
//SD: import * as firebaseui from "firebaseui";
//SD: import "firebase/auth";
import "firebase/database";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from 'firebase/firestore/lite';

import {
  getDatabase
} from "firebase/database";

//v7: import { initializeApp } from 'firebase/app';

const app = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "",
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: ""
});

export const db = getFirestore(app);
// db.settings({ experimentalForceLongPolling: true });
// v7: export const roomsCollection = db.collection('rooms');

export const roomsCollection = collection(db, 'rooms');

export const rtdb = getDatabase(app);