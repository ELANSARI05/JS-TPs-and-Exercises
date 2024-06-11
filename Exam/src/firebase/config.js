import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCo2uMmTZkeMh4VF3iBUgF5jO3EUlCc7Zs",
    authDomain: "resume-builder-e7518.firebaseapp.com",
    projectId: "resume-builder-e7518",
    storageBucket: "resume-builder-e7518.appspot.com",
    messagingSenderId: "105335025618",
    appId: "1:105335025618:web:5a699dc77a68db29e2a20b"
  };

  firebase.initializeApp(firebaseConfig);

  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  export { projectFirestore, projectAuth, googleProvider,facebookProvider  };
  