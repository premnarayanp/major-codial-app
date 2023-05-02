import React from 'react';
import ReactDOM from 'react-dom/client';
//import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import { App } from './components';
import { AuthProvider } from './providers/AuthProvider';

import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <AuthProvider>
        <Router> 
          <App />
        </Router>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
