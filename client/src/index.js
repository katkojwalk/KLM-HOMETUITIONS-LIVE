import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import './index.css'; // Make sure index.css is imported if it was there before

import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n';

// Set global base URL for axios to support relative URLs on HTTPS domain & EC2 hosting
const getFallbackApiUrl = () => {
  if (typeof window !== 'undefined') {
    if (
      window.location.hostname === '16.113.108.168' ||
      window.location.hostname === 'quadrahometuitions.in' ||
      window.location.hostname === 'www.quadrahometuitions.in'
    ) {
      return '';
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
  }
  return 'https://quadrahometuitions.in';
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL || getFallbackApiUrl();

const rawClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const hasValidGoogleClientId = rawClientId && rawClientId !== 'your-google-client-id.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {hasValidGoogleClientId ? (
      <GoogleOAuthProvider clientId={rawClientId}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>
); 