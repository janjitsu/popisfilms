import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import AppRoutes from './routes/AppRoutes.js';
/** firebase */
import firebase from "firebase/compat/app";
/** provider */
import { SessionProvider } from "./providers/Session";

/** start */
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <SessionProvider>
          <AppRoutes />
      </SessionProvider>
  </React.StrictMode>
);
