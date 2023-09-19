
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAeVqqyf3Z0I51qDlbC77RIXUqIp0BQePo",
  authDomain: "canteen-v3.firebaseapp.com",
  projectId: "canteen-v3",
  storageBucket: "canteen-v3.appspot.com",
  messagingSenderId: "482390777501",
  appId: "1:482390777501:web:2f47ce96c0b31de643fe74",
  measurementId: "G-R56EM8L6L9",
  databaseURL:"https://canteen-v3-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);

const Auth = getAuth(App)


export {Auth, App}