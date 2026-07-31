import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Load the design system's base styles + every component/page stylesheet, the
// same way Storybook's preview does (components don't self-import their CSS).
import '@ds/global.css';
import.meta.glob('../../src/**/*.css', { eager: true });
import './hub.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
