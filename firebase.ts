import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCgvK5-zVhm5aBnrVClBaAk9o7RaiDdiAI",
  authDomain: "phuotstore.firebaseapp.com",
  projectId: "phuotstore",
  storageBucket: "phuotstore.appspot.com",
  messagingSenderId: "917875276169",
  appId: "1:917875276169:web:64c4ae86df3e86fee8c958",
  measurementId: "G-39K8N6F8TG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
