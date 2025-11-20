import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const firebaseConfig = {
  apiKey: "AIzaSyDuu3FdyQiaB3ZnT-Zr2upxYRCtPmJR-ZI",
  authDomain: "suki-proyecto.firebaseapp.com",
  projectId: "suki-proyecto",
  storageBucket: "suki-proyecto.firebasestorage.app",
  messagingSenderId: "460539849366",
  appId: "1:460539849366:web:a88567dbf13b5e488e70b7",
  measurementId: "G-LB3E23LT9M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
