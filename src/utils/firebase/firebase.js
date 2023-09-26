import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRgmd1AgJaKh5C1Rsx_6loxTnsHbHXyIU",
  authDomain: "wordplay-1.firebaseapp.com",
  projectId: "wordplay-1",
  storageBucket: "wordplay-1.appspot.com",
  messagingSenderId: "835169294288",
  appId: "1:835169294288:web:a8f9e8e9ef690bb4968bd5",
  measurementId: "G-V8L42V2CRS",
};

firebase.initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const db = getFirestore();

// export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
//   if (!userAuth) return;
//   const userDocRef = doc(db, "users", userAuth.uid);

//   const userSnapshot = await getDoc(userDocRef);

//   if (!userSnapshot.exists()) {
//     const { email } = userAuth;
//     const createdAt = new Date();

//     console.log(additionalInfo);

//     try {
//       await setDoc(userDocRef, {
//         email,
//         createdAt,
//         // ...additionalInfo,
//       });
//     } catch (error) {
//       console.log("error creating the user", error.message);
//     }
//   }

//   return userDocRef;
// };

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export { firebase };
export const firestore = firebase.firestore();
