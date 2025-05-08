// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7hJs8F8a3epJ2qEW1oVYrqWHr3LSYtdg",
  authDomain: "movies-c0afa.firebaseapp.com",
  projectId: "movies-c0afa",
  storageBucket: "movies-c0afa.appspot.com",
  messagingSenderId: "504220561151",
  appId: "1:504220561151:web:b1058f3ab6cf45ec65a6ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export { storage };