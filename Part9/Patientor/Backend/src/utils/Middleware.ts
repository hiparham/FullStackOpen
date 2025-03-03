import { z } from "zod";
import { NewPatientSchema } from "./Types";
import { NextFunction, Request, Response } from "express";
const AddPatientMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const ErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

export { AddPatientMiddleware, ErrorHandler };
