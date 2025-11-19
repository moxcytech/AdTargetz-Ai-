import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Define googleMapsApiLoadedCallback on the window object for TypeScript
declare global {
  interface Window {
    googleMapsApiLoadedCallback: () => void;
  }
}

// Use a specific, dedicated environment variable for the Google Maps API key to avoid conflicts.
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (GOOGLE_MAPS_API_KEY) {
  // Prevent duplicate script injection if it's already been added.
  if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
    // Define the callback function on the window object so it's globally accessible.
    // This function will be called by the Google Maps script once it's loaded.
    window.googleMapsApiLoadedCallback = () => {
      // Dispatch a custom event to notify components that the API is ready.
      // This is a robust way to handle the asynchronous script loading.
      window.dispatchEvent(new Event('google-maps-api-loaded'));
    };

    const script = document.createElement('script');
    // Add the callback parameter to the script URL.
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=googleMapsApiLoadedCallback`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
} else {
  // Add a console warning if the key is missing, so the developer knows why maps features are not working.
  console.warn("Google Maps API key is missing. Location features will be disabled. Please set the GOOGLE_MAPS_API_KEY environment variable.");
}


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);