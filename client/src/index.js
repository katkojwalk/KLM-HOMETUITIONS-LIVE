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
      window.location.hostname === 'www.quadrahometuitions.in' ||
      window.location.hostname === 'klmhometuitions.website' ||
      window.location.hostname === 'www.klmhometuitions.website' ||
      window.location.hostname.endsWith('.vercel.app')
    ) {
      return '';
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
  }
  return 'https://klmhometuitions.website';
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL || getFallbackApiUrl();

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
); 