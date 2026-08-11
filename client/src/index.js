import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import './index.css'; // Make sure index.css is imported if it was there before

import { GoogleOAuthProvider } from '@react-oauth/google';

// Set global base URL for axios so that production builds point to the correct backend
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
); 