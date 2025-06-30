import { Router, Request, Response } from "express";
import { body, param } from "express-validator";
import { handleValidationErrors } from "../../middleware/validationHandler.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import studentService from "../../services/student.service.js";

const router = Router();

// Validation schemas
const studentValidation = {
  create: [
    body("studentCode")
      .notEmpty()
      .withMessage("Student's code is required")
      .isString()
      .withMessage("Student code must be a string"),
    body("firstName")
      .notEmpty()
      .withMessage("Student's first name is required")
      .isString()
      .withMessage("First name must be a string"),
    body("lastName")
      .notEmpty()
      .withMessage("Student's last name is required")
      .isString()
      .withMessage("Last name must be a string"),
    body("email")
      .notEmpty()
      .withMessage("Student's email address is required")
      .isEmail()
      .withMessage("Must be a valid email address"),
    body("phone")
      .optional()
      .isString()
      .withMessage("Phone number must be a string"),
  ],

  update: [
    param("id")
      .notEmpty()
      .withMessage("Student ID is required")
      .isNumeric()
      .withMessage("Student ID must be a number"),
    body("studentCode")
      .optional()
      .isString()
      .withMessage("Student code must be a string"),
    body("firstName")
      .optional()
      .isString()
      .withMessage("First name must be a string"),
    body("lastName")
      .optional()
      .isString()
      .withMessage("Last name must be a string"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Must be a valid email address"),
    body("phone")
      .optional()
      .isString()
      .withMessage("Phone number must be a string"),
  ],
};

/**
 * GET /list
 * Retrieve a list of students.
 */
router.get("/list", async (_req: Request, res: Response): Promise<void> => {
  try {
    const students = await studentService.findAll();
    res.status(200).json(successResponse(students));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to retrieve students"));
  }
});

/**
 * GET /:id
 * Retrieve a student by ID.
 */
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const student = await studentService.findById(id);

    if (!student) {
      res.status(404).json(errorResponse("Student not found"));
      return;
    }

    res.status(200).json(successResponse(student));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to retrieve student"));
  }
});

/**
 * GET /code/:studentCode
 * Retrieve a student by student code.
 */
router.get("/code/:studentCode", async (req: Request, res: Response): Promise<void> => {
  const { studentCode } = req.params;

  try {
    const student = await studentService.findByStudentCode(studentCode);

    if (!student) {
      res.status(404).json(errorResponse("Student not found"));
      return;
    }

    res.status(200).json(successResponse(student));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to retrieve student"));
  }
});

/**
 * POST /create
 * Create a new student.
 */
router.post("/create", studentValidation.create, handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
  const { studentCode, firstName, lastName, email, phone } = req.body;

  try {
    const student = await studentService.create({ 
      studentCode, 
      firstName, 
      lastName, 
      email, 
      phone 
    });

    res.status(201).json(successResponse(student));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to create student"));
  }
});

/**
 * PUT /:id
 * Update an existing student by ID.
 */
router.put("/:id", studentValidation.update, handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { studentCode, firstName, lastName, email, phone } = req.body;

  try {
    const student = await studentService.update(Number(id), { 
      studentCode, 
      firstName, 
      lastName, 
      email, 
      phone 
    });

    res.status(200).json(successResponse(student));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to update student"));
  }
});

/**
 * DELETE /:id
 * Delete a student by ID.
 */
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const student = await studentService.delete(Number(id));

    res.status(200).json(successResponse(student));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to delete student"));
  }
});

export default router;
