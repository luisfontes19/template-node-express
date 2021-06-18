import { Request, Response } from "express";
import User from "../entities/User";

export default class BaseController {

  protected req: Request;
  protected res: Response
  protected currentUser?: User;
  protected action: string;

  public constructor(req: Request, res: Response, action: string) {
    this.req = req;
    this.res = res;
    this.currentUser = this.req.user as User;
    this.action = action;
  }

  //this can be overridden by extended controllers to use async after a constructor
  //if returns false, the endpoint function doesn't get called, but the return message should be handled in the method
  //you can also implement logic here
  protected async beforeAction(): Promise<boolean> {
    return true;
  }

  protected getUserFromReq() {
    return this.req.user as User;
  }

}