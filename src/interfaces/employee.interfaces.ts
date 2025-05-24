export interface Employee {
  id: string;
  email: string;
  name: string;
  password: string;
  codeVerification: string;
  roles: "EMPLOYEE" | "MANAGER";
  isActive: boolean;
  shopId: null;
  dni: string;
  phone: string;
  address: string;
  hireDate: string;
  salary: null;
  notes: string;
  profileImageUrl: string;
  emergencyContact: string;
  createdBy: null;
  resetPasswordCode: null;
  resetPasswordCodeExpires: null;
  resetPasswordCodeUsed: boolean;
  mustChangePassword: boolean;
  employeeShops: EmployeeShop[];
}

export interface EmployeeShop {
  id: string;
  name: string;
}


