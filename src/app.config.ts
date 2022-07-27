import express, { Application } from 'express';

export default class App {
  public app: Application;
  public port: number;

  constructor(appConfig: { port: number; middlewares: any; controllers: any }) {
    this.app = express();
    this.port = appConfig.port;
    this.setMiddlewares(appConfig.middlewares);
    this.setControllers(appConfig.controllers);
  }

  public listen() {
    this.app.listen(this.port, () =>
      console.log(`Express has been started http://localhost:${this.port}`)
    );
  }

  private setMiddlewares(middlewares: {
    forEach: (mid: (middleware: any) => void) => void;
  }) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private setControllers(controllers: {
    forEach: (con: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}
