
import Express from 'express-serve-static-core';
import HealthController from './controllers/HealthController';
import UserController from './controllers/UserController';
import { initRouter } from './router';

export const setRoutes = (app: Express.Express) => {

  const { get, post, put, patch, del } = initRouter(app);

  app.get('/logout', (req, res) => {
    res.clearCookie("jwt");
    req.logout();
    res.redirect("back")
  });

  get("/health", HealthController, "index");

  get("/me", UserController, "me");
  get("/users/:userId", UserController, "show");

}
//http://localhost:1234/auth/google