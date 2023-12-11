export interface EmployeeRequest {
  id?: number;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  dob?: string;
  email: string;
  phone?: string;
  designation?: string;
  salary?: string;
  dateOfJoining?: string;
  skills?: string[];
  address?: string;
  roleId?: number;
  department?: {
    id: number;
  };
}
