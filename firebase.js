"use client";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACbV2lLo2nMkscl77CKQ8CefjJBmXB73s",
  authDomain: "project-1dee7.firebaseapp.com",
  projectId: "project-1dee7",
  storageBucket: "project-1dee7.appspot.com",
  messagingSenderId: "198381421185",
  appId: "1:198381421185:web:e8a0fcfe06e109bca48380",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();

export { db, storage };
