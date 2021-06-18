import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from "passport";
import { Strategy } from 'passport-jwt';
import User from "../entities/User";

//https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c
export default class JWTStrategy {

  public static configure() {

    passport.use("jwt", new Strategy({
      jwtFromRequest: (req) => req.cookies.jwt,
      secretOrKey: process.env.JWT_SIGNING_KEY,
    },
      (payload, done) => {
        if (!payload) return done("User needs to login")
        if (Date.now() > payload.exp) return done('jwt expired');

        done(undefined, payload)
      }
    ));
  }

  public static onStratagyEnd(req: Request, res: Response) {
    return (err: any, user: User) => {
      const payload = {
        email: user.email,
        name: user.name,
        exp: Date.now() + (parseInt(process.env.JWT_EXPIRATION || "0") * 1000)
      };

      req.login(payload, { session: false }, (error) => {
        if (error) return res.status(400).send({ error });


        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SIGNING_KEY!, {
          algorithm: "HS256",
        });

        /** assign our jwt to the cookie */
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        res.redirect("/");
      });
    }
  }
}
