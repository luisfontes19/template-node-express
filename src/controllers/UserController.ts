import User from "../entities/User";
import BaseController from "./BaseController";

export default class UserController extends BaseController {

  private user?: User;

  protected async beforeAction(): Promise<boolean> {
    if (this.action === "show")
      this.user = await User.findOne(this.req.params.userId);

    //if returning false will not run show
    return true;
  }

  public show() {
    //filled in beforeAction :D 
    this.res.send(this.user);
  }

  public me() {
    this.res.json({ user: this.currentUser });
  }
}
