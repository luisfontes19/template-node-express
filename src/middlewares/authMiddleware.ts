import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const authMiddleware = (ignorePaths?: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {
    if (ignorePaths?.includes(req.path)) {
      console.log("Ignoring authentication for " + req.path)
      next()
    }
    else
      passport.authenticate("jwt", { session: false }, (err, user) => {
        if (!user) return res.sendStatus(401)
        if (err) return res.send({ err });

        req.user = user;

        next();
      })(req, res, next)

  }
}
