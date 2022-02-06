import express from 'express';

export default abstract class BaseRoute {
  app: express.Application;

  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.initRoutes();
  }

  public getName(): string {
    return this.name;
  }

    abstract initRoutes(): express.Application;
}
