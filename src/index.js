import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import reportWebVitals from './reportWebVitals';
import AppRoutes from './routes/AppRoutes.js';
/** firebase */
import credentials from "./credentials";
import firebase from "firebase/compat/app";
/** provider */
import { SessionProvider } from "providers/Session";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
