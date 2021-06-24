// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/database'
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBLYiIZfmJhkSWIigohyncxLv366h5ybLo",
  authDomain: "chatbox-e7b02.firebaseapp.com",
  projectId: "chatbox-e7b02",
  storageBucket: "chatbox-e7b02.appspot.com",
  messagingSenderId: "928490150543",
  appId: "1:928490150543:web:c92edca7ae2bff30e52efa",
  measurementId: "G-0DWJ3CWVET"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase;

