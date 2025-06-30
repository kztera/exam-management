import { apiService } from './api';

export interface Student {
  id: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface UpdateStudentData {
  studentCode?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export const studentService = {
  // Get all students
  getAll: async (): Promise<Student[]> => {
    const response = await apiService.get<ApiResponse<Student[]>>('/student/list');
    return response.data;
  },

  // Get student by ID
  getById: async (id: number): Promise<Student> => {
    const response = await apiService.get<ApiResponse<Student>>(`/student/${id}`);
    return response.data;
  },

  // Get student by student code
  getByStudentCode: async (studentCode: string): Promise<Student> => {
    const response = await apiService.get<ApiResponse<Student>>(`/student/code/${studentCode}`);
    return response.data;
  },

  // Create new student
  create: async (data: CreateStudentData): Promise<Student> => {
    const response = await apiService.post<ApiResponse<Student>>('/student/create', data);
    return response.data;
  },

  // Update student
  update: async (id: number, data: UpdateStudentData): Promise<Student> => {
    const response = await apiService.put<ApiResponse<Student>>(`/student/${id}`, data);
    return response.data;
  },

  // Delete student
  delete: async (id: number): Promise<Student> => {
    const response = await apiService.delete<ApiResponse<Student>>(`/student/${id}`);
    return response.data;
  },
};

export default studentService;
