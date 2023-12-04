import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  const message = "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message: error.message || message,
    error: {
      errorCode: statusCode,
      description: error,
    },
  });
};

export default globalErrorHandler;
