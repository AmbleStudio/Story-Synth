import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { signInAnonymously } from "firebase/auth";

const auth = firebase.auth();

export default auth;

export function annonymousSignIn() {
  return signInAnonymously(auth);
}
