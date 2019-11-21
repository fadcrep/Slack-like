// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyB6eXLA14QQgrl4a6o7tgAdEN0XOHpO6Bs",
    authDomain: "slack-like-estiam.firebaseapp.com",
    databaseURL: "https://slack-like-estiam.firebaseio.com",
    projectId: "slack-like-estiam",
    storageBucket: "slack-like-estiam.appspot.com",
    messagingSenderId: "866647325679",
    appId: "1:866647325679:web:67ef1bf8a16388e2b0141a",
    measurementId: "G-BN5BHT1TSW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;