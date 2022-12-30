import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import AppRoutes from './routes/AppRoutes.js';
/** firebase */
import credentials from "./credentials";
import firebase from "firebase/compat/app";
/** provider */
import { SessionProvider } from "./providers/Session";

/** start */
firebase.initializeApp(credentials);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <SessionProvider>
          <AppRoutes />
      </SessionProvider>
  </React.StrictMode>
);
