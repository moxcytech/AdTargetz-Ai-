
import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { SecurityPage } from './components/SecurityPage';

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Ensure route is sync'd on mount
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Centralized effect for handling redirects based on auth state
  useEffect(() => {
    if (isLoading) return; // Don't perform redirects until auth state is confirmed

    const currentRoute = route.toLowerCase();
    const isAuthPage = currentRoute === '#/login' || currentRoute === '#/signup';
    const isDashboardPage = currentRoute.startsWith('#/dashboard');
    // Default landing is root or empty hash
    const isLandingPage = currentRoute === '#/' || currentRoute === '' || currentRoute === '#';
    
    // Public pages logic: Handle #/privacy, #privacy, #/security, #security
    const isPublicPage = currentRoute.includes('privacy') || currentRoute.includes('security');

    if (isAuthenticated) {
      // If logged in:
      // 1. ALLOW access to Dashboard and Public Pages (Privacy/Security)
      // 2. Redirect away from Auth pages (Login/Signup) and Landing page -> Dashboard
      if ((isAuthPage || isLandingPage) && !isPublicPage) {
        window.location.hash = '#/dashboard';
      }
    } else {
      // If not logged in:
      // 1. Redirect away from Dashboard pages -> Login
      if (isDashboardPage) {
        window.location.hash = '#/login';
      }
    }
  }, [route, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const renderContent = () => {
    const currentRoute = route.toLowerCase();

    // Robust check for public pages (handles #/privacy and #privacy)
    if (currentRoute.includes('privacy')) {
        return <PrivacyPolicy />;
    }
    if (currentRoute.includes('security')) {
        return <SecurityPage />;
    }

    // Protected Dashboard Routes
    if (currentRoute.startsWith('#/dashboard')) {
        return isAuthenticated ? <Dashboard /> : null;
    }
    
    // Auth Routes
    if (currentRoute === '#/login') return <Login />;
    if (currentRoute === '#/signup') return <Signup />;
    
    // Default Landing
    return <LandingPage />;
  };

  return <div className="bg-white min-h-screen text-gray-800">{renderContent()}</div>;
}

export default App;
