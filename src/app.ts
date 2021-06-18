import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import express from "express";
import passport from 'passport';
import path from 'path';
import { authMiddleware } from './middlewares/authmiddleware';
import { csrfMiddleware } from './middlewares/csrfMiddleware';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import { requestLoggingMiddleware } from "./middlewares/requestLoggingMiddleware";
import { printRoutes } from './router';
import { setRoutes } from "./routes";
import GoogleStrategy from './strategies/GoogleStrategy';
import JWTStrategy from './strategies/JWTStrategy';


export const startServer = () => {
  const app = express();

  app.use(cookieParser())
  app.use(csrf({ cookie: { httpOnly: false, secure: false, sameSite: true }, }))
  app.use(csrfMiddleware());
  app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL, exposedHeaders: "csrf-token" }))

  app.use(requestLoggingMiddleware);
  app.use(express.json());

  app.use(passport.initialize());
  GoogleStrategy.configure(app);
  JWTStrategy.configure();

  app.use(authMiddleware([process.env.GOOGLE_CALLBACK_PATH!, GoogleStrategy.LOGIN_PATH]))

  app.use(express.static(path.join(__dirname, 'static')));

  setRoutes(app);
  printRoutes();

  app.use(errorHandlingMiddleware);

  const port = process.env.PORT;
  app.listen(port, () => console.log("Starting server on port " + port));

  return app;
}