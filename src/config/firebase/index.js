// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4LuOwy6FIzQNeeH42CWOtwwkOSuEmHjg",
  authDomain: "simple-notes-firebase-4641e.firebaseapp.com",
  databaseURL: "https://simple-notes-firebase-4641e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "simple-notes-firebase-4641e",
  storageBucket: "simple-notes-firebase-4641e.appspot.com",
  messagingSenderId: "1097327048953",
  appId: "1:1097327048953:web:64b310368b52c613570a28",
  measurementId: "G-M5MWJMPNK9"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);

export default firebase