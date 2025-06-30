import db from "./database.js";

interface StudentData {
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

/**
 * Service class for handling student-related business logic
 * Provides an abstraction layer between the database and route handlers
 */
class StudentService {
  /**
   * Retrieves all students from the database
   * @returns {Promise<Array>} List of students
   */
  async findAll() {
    return db.prisma.student.findMany();
  }

  /**
   * Finds a student by their ID
   * @param {number|string} id - The student's ID
   * @returns {Promise<Object|null>} Student object or null if not found
   */
  async findById(id: number | string) {
    return db.prisma.student.findUnique({
      where: { id: Number(id) },
    });
  }

  /**
   * Finds a student by their student code
   * @param {string} studentCode - The student's code
   * @returns {Promise<Object|null>} Student object or null if not found
   */
  async findByStudentCode(studentCode: string) {
    return db.prisma.student.findUnique({
      where: { studentCode },
    });
  }

  /**
   * Creates a new student
   * @param {StudentData} data - Student data
   * @returns {Promise<Object>} Created student
   */
  async create(data: StudentData) {
    return db.prisma.student.create({
      data,
    });
  }

  /**
   * Updates an existing student
   * @param {number|string} id - Student ID to update
   * @param {Partial<StudentData>} data - Updated student data
   * @returns {Promise<Object>} Updated student
   */
  async update(id: number | string, data: Partial<StudentData>) {
    return db.prisma.student.update({
      where: { id: Number(id) },
      data,
    });
  }

  /**
   * Deletes a student
   * @param {number|string} id - Student ID to delete
   * @returns {Promise<Object>} Deleted student
   */
  async delete(id: number | string) {
    return db.prisma.student.delete({
      where: { id: Number(id) },
    });
  }
}

export default new StudentService();
