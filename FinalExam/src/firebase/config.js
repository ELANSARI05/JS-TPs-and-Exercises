import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyB-cinObT-isFpNq7TBv50tYnLeJ4S_fcY",
  authDomain: "myapp-b8dad.firebaseapp.com",
  projectId: "myapp-b8dad",
  storageBucket: "myapp-b8dad.appspot.com",
  messagingSenderId: "187694056110",
  appId: "1:187694056110:web:3b9221c7686a3dabbb233f"
};

  firebase.initializeApp(firebaseConfig);

  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  export { projectFirestore, projectAuth, googleProvider,facebookProvider  };
  