import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCNRJT5pGAZUNKePDy6vs9uczE0isrQdFA',
  authDomain: 'cosmeticapp-2e4aa.firebaseapp.com',
  databaseURL: 'https://cosmeticapp-2e4aa.firebaseio.com',
  projectId: 'cosmeticapp-2e4aa',
  storageBucket: 'cosmeticapp-2e4aa.appspot.com',
  messagingSenderId: '1091715577451',
  appId: '1:1091715577451:web:0c9d6c6c598c6d52b5632e',
  measurementId: 'G-5D6B0W6MCL',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
