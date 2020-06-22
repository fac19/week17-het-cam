import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDDwvcz50mnMhINUogUpQsaJCPSY4jzQ2g",
  authDomain: "hcfirebase-ace80.firebaseapp.com",
  databaseURL: "https://hcfirebase-ace80.firebaseio.com",
  projectId: "hcfirebase-ace80",
  storageBucket: "hcfirebase-ace80.appspot.com",
  messagingSenderId: "738792600835",
  appId: "1:738792600835:web:0aa040c5b631bbbac0a536",
  measurementId: "G-4DLW5FPG45",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
