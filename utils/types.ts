// Types for authentication and user management

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

// Form types for frontend components
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  lastname: string;
  gender: string;
  birthDate: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

// Gender options matching backend validation
export const GENDER_OPTIONS = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Femenino', label: 'Femenino' },
  { value: 'Otro', label: 'Otro' },
  { value: 'Prefiero no decir', label: 'Prefiero no decir' },
] as const;

export type GenderOption = typeof GENDER_OPTIONS[number]['value'];
