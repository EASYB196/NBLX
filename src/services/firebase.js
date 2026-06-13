// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFsUYjiRGW3f8m47A8vsd0isfYvibUUvw",
  authDomain: "nblx-authform.firebaseapp.com",
  projectId: "nblx-authform",
  storageBucket: "nblx-authform.firebasestorage.app",
  messagingSenderId: "325869565335",
  appId: "1:325869565335:web:1da09ed3f6aecb6148c0d2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);