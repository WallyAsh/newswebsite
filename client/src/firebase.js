import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBL-h98hdsW3IdjHkgmMIlW5AIEkslCqEg",
    authDomain: "insaaf-ddf09.firebaseapp.com",
    projectId: "insaaf-ddf09",
    storageBucket: "insaaf-ddf09.appspot.com",
    messagingSenderId: "289637185396",
    appId: "1:289637185396:web:708f83e0623c9e86fb5e21"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
