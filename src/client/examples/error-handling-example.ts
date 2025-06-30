import React from 'react';
import { studentService, Student } from '../services/studentService';

// Example of how to use await-to-js error handling in your components

// Example 1: Simple error handling
export const fetchStudentsExample = async () => {
  try {
    const students = await studentService.getAll();
    console.log('Students loaded successfully:', students);
    return students;
  } catch (error) {
    // Error is already logged and formatted by the service
    console.error('Failed to load students in component');
    // Handle error in UI (show notification, etc.)
    return [];
  }
};

// Example 2: Using in React component with state management
export const useStudentsExample = () => {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  return { students, loading, error, loadStudents };
};

// Example 3: Creating a student with error handling
export const createStudentExample = async (studentData: any) => {
  try {
    const newStudent = await studentService.create(studentData);
    console.log('Student created successfully:', newStudent);
    // Show success notification
    return { success: true, student: newStudent };
  } catch (error) {
    console.error('Failed to create student');
    // Show error notification
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
