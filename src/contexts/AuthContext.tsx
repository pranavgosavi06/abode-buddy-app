
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'student' | 'owner';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock function to simulate API calls
const mockApiCall = (data: any, shouldSucceed = true, delay = 1000): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(data);
      } else {
        reject(new Error('API call failed'));
      }
    }, delay);
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if the user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would check if the user has a valid session/token
        const storedUser = localStorage.getItem('pgapp_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Clear any invalid data
        localStorage.removeItem('pgapp_user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an actual API call to your backend
      const mockUser = await mockApiCall({
        id: '123',
        name: email.split('@')[0],
        email,
        // For demo purposes, determine role by email
        role: email.includes('owner') ? 'owner' : 'student',
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=3B82F6&color=fff`,
      });
      
      // Save user to localStorage (for persistence)
      localStorage.setItem('pgapp_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to create a new user
      const mockUser = await mockApiCall({
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=3B82F6&color=fff`,
      });
      
      // Save user to localStorage (for persistence)
      localStorage.setItem('pgapp_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user from localStorage
    localStorage.removeItem('pgapp_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
