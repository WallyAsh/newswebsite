import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDxz-3TBxzggUAbIlpeaW-1v6jKYrnpv48",
    authDomain: "manage-it-8c258.firebaseapp.com",
    projectId: "manage-it-8c258",
    storageBucket: "manage-it-8c258.appspot.com",
    messagingSenderId: "335938263906",
    appId: "1:335938263906:web:88714f7ec6657c35b42a3b",
    measurementId: "G-71SJZQS1BV"
};
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
