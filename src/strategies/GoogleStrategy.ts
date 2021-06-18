import { NextFunction } from "express";
import Express from 'express-serve-static-core';
import passport from "passport";
import { Strategy } from 'passport-google-oauth20';
import User from "../entities/User";
import JWTStrategy from "./JWTStrategy";

// type callback = (req: Request, res: Response) => ((err: any, user: User) => void)

// export interface GoogleStrategyParams {
//   scope: string[];
//   url: string;
//   callbackUrl: string;
//   failureUrl: string;
//   cb: callback;
// }


export default class GoogleStrategy {

  public static LOGIN_PATH = '/login/google';


  public static configure(app: Express.Express) {

    passport.use("google", new Strategy({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.SERVER_URL! + process.env.GOOGLE_CALLBACK_PATH!,
      passReqToCallback: true,
    },
      async (req, accessToken, refreshToken, profile, done: any) => {
        //@ts-ignore
        const email = profile.emails[0].value;
        let user = await User.findOne({ where: { email: email } });
        return done(undefined, user)
      }
    ));

    //route to initiate google auth process
    app.get(GoogleStrategy.LOGIN_PATH, passport.authenticate('google', { scope: ["email", "profile"] }));

    //callback to receive auth from google
    //on success will create the jwt in JWTStrategy.onStratagyEnd
    app.get(process.env.GOOGLE_CALLBACK_PATH!, (req, res, next: NextFunction) => {
      passport.authenticate('google', { failureRedirect: GoogleStrategy.LOGIN_PATH, session: false }, JWTStrategy.onStratagyEnd(req, res))(req, res)
    })

    // passport.serializeUser((user, done) => done(null, user));
    // passport.deserializeUser((user: any, done) => done(null, user));
  }


}



