// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

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

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;