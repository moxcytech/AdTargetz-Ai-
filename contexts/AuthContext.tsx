import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On initial load, check if a user session is stored in localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      setUser(null); // Clear state if localStorage is corrupt
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    // This is a simplified mock. In a real app, you'd check against a list of users.
    // For this demo, any login is successful unless the email is "error@test.com".
    if (email.toLowerCase() === 'error@test.com') {
      return { success: false, error: 'Invalid credentials provided.' };
    }
    
    const userData = { email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const signup = async (email: string, pass: string) => {
    // Mock signup. In a real localStorage setup, you might check if user exists.
    // For this demo, any login is successful unless the email is 'exists@test.com'.
    if (email.toLowerCase() === 'exists@test.com') {
        return { success: false, error: 'An account with this email already exists.' };
    }

    const userData = { email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    // Clear user state on the client
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};