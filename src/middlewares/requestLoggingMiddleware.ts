import { NextFunction, Request, Response } from "express";

export const requestLoggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()}@${req.ip} ${req.method.toUpperCase()} ${req.url}`);
  next();
};
