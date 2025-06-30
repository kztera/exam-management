import { Router, Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { successResponse, errorResponse } from "../../utils/response.js";
import studentService from "../../services/student.service.js";

const router = Router();

// Validation schemas
const studentValidation = {
  create: celebrate({
    body: Joi.object({
      studentCode: Joi.string().required().description("Student's code"),
      firstName: Joi.string().required().description("Student's first name"),
      lastName: Joi.string().required().description("Student's last name"),
      email: Joi.string().email().required().description("Student's email address"),
      phone: Joi.string().optional().description("Student's phone number"),
    }),
  }),

  update: celebrate({
    params: Joi.object({
      id: Joi.number().required().description("Student ID"),
    }),
    body: Joi.object({
      studentCode: Joi.string().description("Updated student code"),
      firstName: Joi.string().description("Updated first name"),
      lastName: Joi.string().description("Updated last name"),
      email: Joi.string().email().description("Updated email address"),
      phone: Joi.string().description("Updated phone number"),
    }),
  }),
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
router.post("/create", studentValidation.create, async (req: Request, res: Response): Promise<void> => {
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
router.put("/:id", studentValidation.update, async (req: Request, res: Response): Promise<void> => {
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
