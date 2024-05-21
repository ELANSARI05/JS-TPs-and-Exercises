import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCx9wPMGlQSsBnqnTF1mYYooVpa1jPR4vk",
  authDomain: "tp6-forum.firebaseapp.com",
  projectId: "tp6-forum",
  storageBucket: "tp6-forum.appspot.com",
  messagingSenderId: "988720251378",
  appId: "1:988720251378:web:d3b75fd10223088cbfab6b"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { projectFirestore, projectAuth, googleProvider };
