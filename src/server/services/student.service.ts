import { BaseService } from "./base.service.js";

interface StudentData {
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

/**
 * Service class for handling student-related business logic
 * Extends BaseService to inherit common database operations
 */
class StudentService extends BaseService<StudentData> {
  constructor() {
    super("student"); // Pass the table name to base service
  }

  /**
   * Finds a student by their student code
   * @param {string} studentCode - The student's code
   * @returns {Promise<Object|null>} Student object or null if not found
   */
  async findByStudentCode(studentCode: string) {
    return this.model.findUnique({
      where: { studentCode },
    });
  }

  /**
   * Check if student code already exists
   * @param {string} studentCode - The student code to check
   * @param {number} excludeId - ID to exclude from check (for updates)
   * @returns {Promise<boolean>} True if student code exists
   */
  async isStudentCodeExists(studentCode: string, excludeId?: number): Promise<boolean> {
    const where: any = { studentCode };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    return this.exists(where);
  }

  /**
   * Check if email already exists
   * @param {string} email - The email to check
   * @param {number} excludeId - ID to exclude from check (for updates)
   * @returns {Promise<boolean>} True if email exists
   */
  async isEmailExists(email: string, excludeId?: number): Promise<boolean> {
    const where: any = { email };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    return this.exists(where);
  }

  /**
   * Search students by name or student code
   * @param {string} searchTerm - Search term
   * @returns {Promise<Array>} Matching students
   */
  async search(searchTerm: string) {
    return this.model.findMany({
      where: {
        OR: [
          { firstName: { contains: searchTerm, mode: 'insensitive' } },
          { lastName: { contains: searchTerm, mode: 'insensitive' } },
          { studentCode: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      orderBy: [
        { firstName: 'asc' },
        { lastName: 'asc' },
      ],
    });
  }

  /**
   * Get students with pagination and filtering
   * @param {object} options - Query options
   * @returns {Promise<Object>} Paginated results
   */
  async getPaginated(options: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'firstName',
      sortOrder = 'asc',
    } = options;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { studentCode: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const queryOptions = {
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    };

    const [students, total] = await Promise.all([
      this.findMany(where, queryOptions),
      this.count(where),
    ]);

    return {
      data: students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }
}

export default new StudentService();
