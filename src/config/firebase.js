// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD-Ht2Km1Dq2e0vXuBPYTgdHCisKlx0ygg',
	authDomain: 'react-blog-309bf.firebaseapp.com',
	projectId: 'react-blog-309bf',
	storageBucket: 'react-blog-309bf.appspot.com',
	messagingSenderId: '175469411341',
	appId: '1:175469411341:web:021e9aea312d2568dda944',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
