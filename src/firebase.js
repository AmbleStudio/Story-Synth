import {
  initializeApp
} from 'firebase/app';
import * as firebaseauth from "firebase/auth";
import * as firebaseui from "firebaseui";

const app = initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "ss-amble.firebaseapp.com",
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: "ss-amble.appspot.com",
  messagingSenderId: "750012918172"
});

export const auth = app.auth();
/* eslint-disable no-debugger */
debugger

export const authUiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    firebaseauth.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

//*REFERENCE*/
// export const authUiConfig = {
//   signInSuccessUrl: "/",
//   signInOptions: [{
//     provider: app.auth.EmailAuthProvider.PROVIDER_ID,
//     customParameters: {
//       prompt: "select_account",
//     },
//   }, ],
// };

export const authUi = new firebaseui.auth.AuthUI(auth);


export const db = app.firestore();

db.settings({
  experimentalForceLongPolling: true
});

export const roomsCollection = db.collection('rooms');

export const rtdb = app.database();