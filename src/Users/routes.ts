import express from "express";
import { BaseRoute } from "../Base/routes";
import out from '../Helpers/out';

export default class UsersRoute extends BaseRoute {
  constructor(app: express.Application) {
    super(app, "users");
  }
  public initRoutes(): express.Application {
    this.app.route("/users").get((req, res) => {
        return out(res, 200, {"Basic": "Hello"}, "Hello", undefined);
    });
    return this.app;
  }
}
