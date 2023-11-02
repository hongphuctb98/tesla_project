// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3dnUu02vd9tu2zB_RuW28r9v1R5DrRvo",
  authDomain: "ecomcar-3c8a7.firebaseapp.com",
  projectId: "ecomcar-3c8a7",
  storageBucket: "ecomcar-3c8a7.appspot.com",
  messagingSenderId: "383166214848",
  appId: "1:383166214848:web:208430feef1c8fc59eb325",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = getStorage(app);

export { store };
