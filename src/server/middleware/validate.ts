import { body, param } from "express-validator";

/**
 * Validation schemas for contact-related requests
 * Uses express-validator for request validation
 */
export const contactValidation = {
  /**
   * Validation for contact creation
   * Requires firstName, lastName, and valid email
   */
  create: [
    body("firstName")
      .notEmpty()
      .withMessage("Contact's first name is required")
      .isString()
      .withMessage("First name must be a string"),
    body("lastName")
      .notEmpty()
      .withMessage("Contact's last name is required")
      .isString()
      .withMessage("Last name must be a string"),
    body("email")
      .notEmpty()
      .withMessage("Contact's email address is required")
      .isEmail()
      .withMessage("Must be a valid email address"),
  ],

  /**
   * Validation for contact updates
   * All fields are optional, but must be valid if provided
   */
  update: [
    param("id")
      .notEmpty()
      .withMessage("Contact ID is required")
      .isNumeric()
      .withMessage("Contact ID must be a number"),
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
  ],
};
