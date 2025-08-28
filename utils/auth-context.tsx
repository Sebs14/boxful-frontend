'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authAPI, tokenUtils } from '../utils/auth';
import type { UserProfile, RegisterData } from '../utils/types';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenUtils.getToken();
      if (token) {
        try {
          await getProfile();
        } catch (error) {
          // Token is invalid, remove it
          tokenUtils.removeToken();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      tokenUtils.setToken(response.access_token);

      // Get user profile after login
      await getProfile();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(userData);
      // After successful registration, you might want to auto-login
      // or redirect to login page
      console.log('User registered:', response);
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    const token = tokenUtils.getToken();
    if (!token) return;

    try {
      const userProfile = await authAPI.getProfile(token);
      setUser(userProfile);
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  };

  const logout = () => {
    tokenUtils.removeToken();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    getProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
