import { Router, Request, Response } from "express";
import errorHandler from "strong-error-handler";
import studentRoutes from "./student.route.js";

const router = Router();

router.use("/student", studentRoutes);

/**
 * GET /health
 * Health check endpoint.
 */
router.get("/health", (_req: Request, res: Response) => {
  res.send("Ok");
});

// Error handling middleware
router.use(
  errorHandler({
    debug: process.env.ENV !== "prod",
    log: true,
  })
);

export default router;
