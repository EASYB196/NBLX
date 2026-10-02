import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAFsUYjiRGW3f8m47A8vsd0isfYvibUUvw',
  authDomain: 'nblx-authform.firebaseapp.com',
  projectId: 'nblx-authform',
  storageBucket: 'nblx-authform.firebasestorage.app',
  messagingSenderId: '325869565565',
  appId: '1:325869565565:web:1da09ed3f6aecb6148c0d2',
  measurementId: 'G-BRQ4PPHL4K',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
