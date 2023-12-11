export interface EmployeeResponse {
  data: {
    employees: EmployeeGlobal[];
    count: number;
  };
  message: string;
}


export interface EmployeeCreateResponse {
  message: string;
  data: {
    id: number;
  };
}


export interface EmployeeGlobal {
  id: number;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  dob?: string;
  email: string;
  phone?: string;
  designation?: string;
  salary?: string;
  dateOfJoining?: string;
  skills: {
    id: number;
    skill: string;
  }[];
  address?: string;
  role?: {
    id: number;
    role: string;
  };
  department?: {
    id: number;
    department: string;
  };
}
