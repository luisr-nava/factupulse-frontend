export interface User {
  id: string;
  email: string;
  name: string;
  codeVerification?: string;
  roles: string[];
  isActive: boolean;
  shopId?: string;
  dni?: string;
  phone?: string;
  address?: string;
  hireDate: string;
  salary?: string;
  notes?: string;
  profileImageUrl?: string;
  emergencyContact?: string;
  createdBy?: string;
  resetPasswordCode?: string;
  resetPasswordCodeExpires?: string;
  resetPasswordCodeUsed: boolean;
  mustChangePassword: boolean;
}

