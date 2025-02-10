import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCr9677PR6hlT6ZikXYYlnfZvsTFHAn94w",
  authDomain: "storage-8ffee.firebaseapp.com",
  projectId: "storage-8ffee",
  storageBucket: "storage-8ffee.appspot.com",
  messagingSenderId: "456045699116",
  appId: "1:456045699116:web:c157332829605bef5e7189"
};


const app = initializeApp(firebaseConfig);
export const imageUpload = getStorage(app);
export const postUpload = getFirestore(app);
export const auth = getAuth();
export const db = getFirestore(app);

const exportfirebase = {
    imageUpload,
    postUpload,
    db,
    auth,
};

export default exportfirebase;