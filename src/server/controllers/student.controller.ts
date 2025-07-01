import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base.controller.js";
import studentService from "@/server/services/student.service.js";
import { successResponse, errorResponse } from "@/server/utils/response.js";

/**
 * Student controller extending BaseController
 * Handles HTTP requests for student-related operations
 */
class StudentController extends BaseController {
  constructor() {
    super(studentService);
    this.bindMethods();
  }

  /**
   * Get student by student code
   * GET /code/:studentCode
   */
  async getByStudentCode(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { studentCode } = req.params;
      const student = await studentService.findByStudentCode(studentCode);

      if (!student) {
        res.status(404).json(errorResponse("Student not found"));
        return;
      }

      res.status(200).json(successResponse(student, "Student retrieved successfully"));
    } catch (error) {
      console.error("Error in getByStudentCode:", error);
      res.status(500).json(errorResponse("Failed to retrieve student"));
    }
  }

  /**
   * Search students
   * GET /search?q=searchTerm
   */
  async search(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { q: searchTerm } = req.query;

      if (!searchTerm || typeof searchTerm !== 'string') {
        res.status(400).json(errorResponse("Search term is required"));
        return;
      }

      const students = await studentService.search(searchTerm);
      res.status(200).json(successResponse(students, "Search results retrieved successfully"));
    } catch (error) {
      console.error("Error in search:", error);
      res.status(500).json(errorResponse("Failed to search students"));
    }
  }

  /**
   * Get paginated students
   * GET /paginated?page=1&limit=10&search=term&sortBy=firstName&sortOrder=asc
   */
  async getPaginated(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
      } = req.query;

      const options = {
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
      };

      const result = await studentService.getPaginated(options);
      res.status(200).json(successResponse(result, "Paginated students retrieved successfully"));
    } catch (error) {
      console.error("Error in getPaginated:", error);
      res.status(500).json(errorResponse("Failed to retrieve paginated students"));
    }
  }

  /**
   * Transform and validate create data
   */
  protected transformCreateData(data: any): any {
    const { studentCode, firstName, lastName, email, phone } = data;

    // Validate required fields
    const requiredFields = ['studentCode', 'firstName', 'lastName', 'email'];
    const errors = this.validateRequiredFields(data, requiredFields);

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Transform data
    return {
      studentCode: studentCode?.trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email?.trim().toLowerCase(),
      phone: phone?.trim() || null,
    };
  }

  /**
   * Transform and validate update data
   */
  protected transformUpdateData(data: any): any {
    const { studentCode, firstName, lastName, email, phone } = data;

    const transformedData: any = {};

    if (studentCode !== undefined) {
      transformedData.studentCode = studentCode.trim();
    }
    if (firstName !== undefined) {
      transformedData.firstName = firstName.trim();
    }
    if (lastName !== undefined) {
      transformedData.lastName = lastName.trim();
    }
    if (email !== undefined) {
      transformedData.email = email.trim().toLowerCase();
    }
    if (phone !== undefined) {
      transformedData.phone = phone?.trim() || null;
    }

    return transformedData;
  }

  /**
   * Build where clause for student filtering
   */
  protected buildWhereClause(filters: any): any {
    const where: any = {};
    const { search, ...otherFilters } = filters;

    // Handle search across multiple fields
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { studentCode: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Handle other filters
    Object.keys(otherFilters).forEach(key => {
      if (otherFilters[key] !== undefined && otherFilters[key] !== '') {
        where[key] = otherFilters[key];
      }
    });

    return where;
  }

  /**
   * Override create method to add business logic validation
   */
  async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const data = this.transformCreateData(req.body);

      // Check if student code already exists
      const existingByCode = await studentService.isStudentCodeExists(data.studentCode);
      if (existingByCode) {
        res.status(400).json(errorResponse("Student code already exists"));
        return;
      }

      // Check if email already exists
      const existingByEmail = await studentService.isEmailExists(data.email);
      if (existingByEmail) {
        res.status(400).json(errorResponse("Email already exists"));
        return;
      }

      const student = await studentService.create(data);
      res.status(201).json(successResponse(student, "Student created successfully"));
    } catch (error) {
      console.error("Error in create:", error);
      if (error instanceof Error && error.message.includes('Validation failed')) {
        res.status(400).json(errorResponse(error.message));
      } else {
        res.status(500).json(errorResponse("Failed to create student"));
      }
    }
  }

  /**
   * Override update method to add business logic validation
   */
  async update(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const data = this.transformUpdateData(req.body);

      // Check if record exists
      const existingStudent = await studentService.findById(id);
      if (!existingStudent) {
        res.status(404).json(errorResponse("Student not found"));
        return;
      }

      // Check if student code already exists (excluding current student)
      if (data.studentCode) {
        const existingByCode = await studentService.isStudentCodeExists(data.studentCode, Number(id));
        if (existingByCode) {
          res.status(400).json(errorResponse("Student code already exists"));
          return;
        }
      }

      // Check if email already exists (excluding current student)
      if (data.email) {
        const existingByEmail = await studentService.isEmailExists(data.email, Number(id));
        if (existingByEmail) {
          res.status(400).json(errorResponse("Email already exists"));
          return;
        }
      }

      const student = await studentService.update(id, data);
      res.status(200).json(successResponse(student, "Student updated successfully"));
    } catch (error) {
      console.error("Error in update:", error);
      res.status(500).json(errorResponse("Failed to update student"));
    }
  }
}

export default new StudentController();
