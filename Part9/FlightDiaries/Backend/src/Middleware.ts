import { NextFunction, Request, Response } from "express";
import { newEntrySchema } from "./Types";
import { z } from "zod";

const AddPostMiddleWare = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newEntrySchema.parse(req.body);
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
    res.status(400).json(error.issues);
  } else {
    next(error);
  }
};

export { AddPostMiddleWare, ErrorHandler };
