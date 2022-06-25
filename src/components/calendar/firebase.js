import firebase from 'firebase/compat/app'; import 'firebase/compat/auth'; import 'firebase/compat/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyB34YDtvpPG6I09hSIoFvotubeZ8XbSWj8",
  authDomain: "iefyp2022.firebaseapp.com",
  databaseURL: "https://iefyp2022-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iefyp2022",
  storageBucket: "iefyp2022.appspot.com",
  messagingSenderId: "848328275611",
  appId: "1:848328275611:web:6a55318c25a48b2f36383e",
  measurementId: "G-3KCMWXHQS3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export default db;