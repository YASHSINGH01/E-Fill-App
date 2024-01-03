import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBLkTm4d1nHjCu-y8P-6ffHv5w-2-Gdpl8",
  authDomain: "efev-charging-solutions.firebaseapp.com",
  databaseURL: "https://efev-charging-solutions-default-rtdb.firebaseio.com",
  projectId: "efev-charging-solutions",
  storageBucket: "efev-charging-solutions.appspot.com",
  messagingSenderId: "763128769510",
  appId: "1:763128769510:web:a023da7cb995e423b34427"
  };

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();

