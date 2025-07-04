import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

/**
 * Array of security middleware functions
 * Includes helmet for HTTP headers and rate limiting
 * @constant {Array<Function>}
 */
export const securityMiddleware = [
  // Helmet middleware for securing HTTP headers
  helmet(),

  // Rate limiting to prevent abuse
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
  }),
];

/**
 * Middleware for logging incoming requests
 * Logs timestamp, HTTP method, and URL path
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
};
