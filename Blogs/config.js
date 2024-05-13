import firebase  from 'firebase/app'

import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB1GXgSF4aYVgrkLugpmV5hbhNe71GWz_U",
  authDomain: "articles-f24ce.firebaseapp.com",
  projectId: "articles-f24ce",
  storageBucket: "articles-f24ce.appspot.com",
  messagingSenderId: "164022110187",
  appId: "1:164022110187:web:acf461151b731c9174bbae"
};
  
firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore();
export {projectFirestore}