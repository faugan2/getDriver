// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDj_RNbUJ5Re4KmLtYWtByO5EHGF_8p2Ok",
  authDomain: "getdrivertogo.firebaseapp.com",
  projectId: "getdrivertogo",
  storageBucket: "getdrivertogo.appspot.com",
  messagingSenderId: "861986497828",
  appId: "1:861986497828:web:c96f901ecc25c78293bfb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);

export {auth,db,storage};


*/
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


/*
const firebaseConfig = {
  apiKey: "AIzaSyBbZbzP407pWBHaaAEr48jJkrZm_8F2vfQ",
  authDomain: "prosportguru-a0569.firebaseapp.com",
  projectId: "prosportguru-a0569",
  storageBucket: "prosportguru-a0569.appspot.com",
  messagingSenderId: "46274020109",
  appId: "1:46274020109:web:77138d23dbfecebac1a644"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyDj_RNbUJ5Re4KmLtYWtByO5EHGF_8p2Ok",
  authDomain: "getdrivertogo.firebaseapp.com",
  projectId: "getdrivertogo",
  storageBucket: "getdrivertogo.appspot.com",
  messagingSenderId: "861986497828",
  appId: "1:861986497828:web:c96f901ecc25c78293bfb1"
};




let app;
if(firebase.apps.length==0){
  app=firebase.initializeApp(firebaseConfig);
}else{
  app=firebase.app();
}


const auth=app.auth();
const db=app.firestore();
const storage=app.storage();




export {auth,db,storage};





