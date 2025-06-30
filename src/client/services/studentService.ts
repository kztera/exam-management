import to from 'await-to-js';
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
    const [error, response] = await to(apiService.get<ApiResponse<Student[]>>('/student/list'));
    if (error) {
      console.error('Error fetching students:', error.message);
      throw new Error(`Failed to fetch students: ${error.message}`);
    }
    return response.data;
  },

  // Get student by ID
  getById: async (id: number): Promise<Student> => {
    const [error, response] = await to(apiService.get<ApiResponse<Student>>(`/student/${id}`));
    if (error) {
      console.error(`Error fetching student ${id}:`, error.message);
      throw new Error(`Failed to fetch student: ${error.message}`);
    }
    return response.data;
  },

  // Get student by student code
  getByStudentCode: async (studentCode: string): Promise<Student> => {
    const [error, response] = await to(apiService.get<ApiResponse<Student>>(`/student/code/${studentCode}`));
    if (error) {
      console.error(`Error fetching student with code ${studentCode}:`, error.message);
      throw new Error(`Failed to fetch student: ${error.message}`);
    }
    return response.data;
  },

  // Create new student
  create: async (data: CreateStudentData): Promise<Student> => {
    const [error, response] = await to(apiService.post<ApiResponse<Student>>('/student/create', data));
    if (error) {
      console.error('Error creating student:', error.message);
      throw new Error(`Failed to create student: ${error.message}`);
    }
    return response.data;
  },

  // Update student
  update: async (id: number, data: UpdateStudentData): Promise<Student> => {
    const [error, response] = await to(apiService.put<ApiResponse<Student>>(`/student/${id}`, data));
    if (error) {
      console.error(`Error updating student ${id}:`, error.message);
      throw new Error(`Failed to update student: ${error.message}`);
    }
    return response.data;
  },

  // Delete student
  delete: async (id: number): Promise<Student> => {
    const [error, response] = await to(apiService.delete<ApiResponse<Student>>(`/student/${id}`));
    if (error) {
      console.error(`Error deleting student ${id}:`, error.message);
      throw new Error(`Failed to delete student: ${error.message}`);
    }
    return response.data;
  },
};

export default studentService;
