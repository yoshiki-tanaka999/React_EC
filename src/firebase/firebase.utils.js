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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // snapShotが存在しなかった時(ユーザー情報が登録されていない)
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error) {
            console.log('error creating user', error.messsage);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;