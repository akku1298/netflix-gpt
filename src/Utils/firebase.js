// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB4gun8BuZOHW32mZ3t3w0gQpss1soeatg",
  authDomain: "netflix-gpt-9b19f.firebaseapp.com",
  projectId: "netflix-gpt-9b19f",
  storageBucket: "netflix-gpt-9b19f.appspot.com",
  messagingSenderId: "1054940517435",
  appId: "1:1054940517435:web:469238bec5f1dbc3de381e",
  measurementId: "G-2Z38YMWNL1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();