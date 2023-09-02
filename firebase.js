import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDf3v8XnRdw4YJpu4iJE8IWaFUySQCVTXk",
  authDomain: "apifusion-48177.firebaseapp.com",
  projectId: "apifusion-48177",
  storageBucket: "apifusion-48177.appspot.com",
  messagingSenderId: "564406889872",
  appId: "1:564406889872:web:36b9800f4b8ceee8f59715",
  measurementId: "G-98Q7RPR75T"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { auth };
