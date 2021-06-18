import { NextFunction, Request, Response } from 'express';

export const csrfMiddleware = (headerName?: string) => {
  const name = headerName || "csrf-token";

  return (req: Request, res: Response, next: NextFunction) => {
    res.set(name, req.csrfToken());
    next();
  }
}
