// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBse5smuuuYbahGPyaICdF7bVBkq9HZRg4",
  authDomain: "reactlogin-44c40.firebaseapp.com",
  projectId: "reactlogin-44c40",
  storageBucket: "reactlogin-44c40.appspot.com",
  messagingSenderId: "603766561258",
  appId: "1:603766561258:web:0b18374cb516b17f013a93"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export {auth}; // auth nesnesini dışarıya açtık.
