import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FireBaseProvider from './shared/context/FireBaseContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FireBaseProvider>
       <App /></FireBaseProvider>   
  </React.StrictMode>
);

reportWebVitals();
