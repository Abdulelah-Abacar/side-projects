export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Photo {
  _id: string;
  title: string;
  description: string;
  filename: string;
  userId?: User;
  likes: string[];
  borderColor?: string;
  gradient?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PhotoFormData {
  title: string;
  description: string;
  file: File | null;
}

export interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
}
