import { Router } from "express";
import { body, param } from "express-validator";
import { handleValidationErrors } from "@/middleware/validationHandler.js";
import studentController from "@/controllers/student.controller.js";

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

  id: [
    param("id")
      .notEmpty()
      .withMessage("Student ID is required")
      .isNumeric()
      .withMessage("Student ID must be a number"),
  ],
};

/**
 * GET /list
 * Retrieve a list of students.
 */
router.get("/list", studentController.getAll);

/**
 * GET /paginated
 * Retrieve paginated list of students with search and sorting.
 */
router.get("/paginated", studentController.getPaginated);

/**
 * GET /search
 * Search students by name, code, or email.
 */
router.get("/search", studentController.search);

/**
 * GET /count
 * Get total count of students.
 */
router.get("/count", studentController.count);

/**
 * GET /:id
 * Retrieve a student by ID.
 */
router.get("/:id", studentValidation.id, handleValidationErrors, studentController.getById);

/**
 * GET /code/:studentCode
 * Retrieve a student by student code.
 */
router.get("/code/:studentCode", studentController.getByStudentCode);

/**
 * POST /create
 * Create a new student.
 */
router.post("/create", studentValidation.create, handleValidationErrors, studentController.create);

/**
 * POST /bulk
 * Create multiple students.
 */
router.post("/bulk", studentController.bulkCreate);

/**
 * PUT /:id
 * Update an existing student by ID.
 */
router.put("/:id", studentValidation.update, handleValidationErrors, studentController.update);

/**
 * DELETE /:id
 * Delete a student by ID.
 */
router.delete("/:id", studentValidation.id, handleValidationErrors, studentController.delete);

export default router;
