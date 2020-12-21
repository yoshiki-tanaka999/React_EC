import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const  config = {
    apiKey: "AIzaSyAOpdFBQoq_PZBAh-w1R9AybuN71lSkS_g",
    authDomain: "react-training-ec-db.firebaseapp.com",
    projectId: "react-training-ec-db",
    storageBucket: "react-training-ec-db.appspot.com",
    messagingSenderId: "1040453813537",
    appId: "1:1040453813537:web:e96022e8705f7d83da2a60"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;