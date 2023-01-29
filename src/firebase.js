import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWcuNFgCWNcp4TvzkVqS1R2Af6vj1c0CQ",
    authDomain: "clone-6a358.firebaseapp.com",
    projectId: "clone-6a358",
    storageBucket: "clone-6a358.appspot.com",
    messagingSenderId: "868387098101",
    appId: "1:868387098101:web:29b58c7e9dfda7673624bc",
    measurementId: "G-PKRNQPM6F9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };