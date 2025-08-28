import { apiRequest } from './api';
import type { LoginCredentials, RegisterData, AuthResponse, UserProfile } from './types';

// Authentication API functions
export const authAPI = {
  // Register a new user
  register: async (userData: RegisterData): Promise<UserProfile> => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get user profile (requires authentication)
  getProfile: async (token: string): Promise<UserProfile> => {
    return apiRequest('/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Token management utilities
export const tokenUtils = {
  // Store token in localStorage
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  // Remove token from localStorage
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!tokenUtils.getToken();
  },
};
