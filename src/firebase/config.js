import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';  // Add this line to import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBg-WUqA62IO5JaWW8du2RXL_ZCtC_OAl0",
  authDomain: "final-d58d7.firebaseapp.com",
  projectId: "final-d58d7",
  storageBucket: "final-d58d7.appspot.com",
  messagingSenderId: "1067911488964",
  appId: "1:1067911488964:web:79d0d6c8566baef2ce3091"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();  // Initialize Firebase Storage

export { projectFirestore, projectAuth, projectStorage };
