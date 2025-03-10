import { initializeApp, getApps , getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyADs3ja5B3rMbuL57RT3Iq8vn9GlKS_gcM",
  authDomain: "notion-clone-5bcca.firebaseapp.com",
  projectId: "notion-clone-5bcca",
  storageBucket: "notion-clone-5bcca.firebasestorage.app",
  messagingSenderId: "180760917203",
  appId: "1:180760917203:web:f3d9139262149f75901026"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore( app );

export {db};