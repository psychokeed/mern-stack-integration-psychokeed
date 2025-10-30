import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </React.StrictMode>,
);
