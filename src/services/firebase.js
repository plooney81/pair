import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyDjoEJgxs0Yl77aOnb33Y6nGLvyBNa8wzg",
    authDomain: "react-solo-project-pl.firebaseapp.com",
    databaseURL: "https://react-solo-project-pl.firebaseio.com",
    storageBucket: "gs://react-solo-project-pl.appspot.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const storageRef = firebase.storage().ref();