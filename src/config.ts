// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBmHImHMfCzDwUmSM1W-WVmyephwH7lJaU',
  authDomain: 'repair-d6395.firebaseapp.com',
  projectId: 'repair-d6395',
  storageBucket: 'repair-d6395.appspot.com',
  messagingSenderId: '699649258778',
  appId: '1:699649258778:web:f771b409b7ca130eb3a8a3',
  measurementId: 'G-ETBZMR8S3G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fbStore = getFirestore(app);
