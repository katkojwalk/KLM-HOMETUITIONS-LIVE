import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import './index.css'; // Make sure index.css is imported if it was there before

import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n';

// Set global base URL for axios to support Netlify deployment, EC2 hosting, and local dev
const getFallbackApiUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === '16.113.108.168') {
      return '';
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
  }
  return 'http://16.113.108.168';
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL || getFallbackApiUrl();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';
console.log('Google Client ID being used starts with:', clientId.substring(0, 15) + '...');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
); 