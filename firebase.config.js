import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXY8hsmyHUaxORaAoV3Yf4CB7trvqrLpQ',
  authDomain: 'netflix-clone-47c01.firebaseapp.com',
  projectId: 'netflix-clone-47c01',
  storageBucket: 'netflix-clone-47c01.appspot.com',
  messagingSenderId: '475649175437',
  appId: '1:475649175437:web:35e72d1c9be7716de217c4',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Services
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
