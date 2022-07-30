import * as express from 'express';

import TaskService from '../services/task.services';
import adminAuth from '../middleware/auth.middleware';
import AuthService from '../services/auth.service';

export default class TaskController {
  public router = express.Router();
  public path = '/';
  private taskService: TaskService;
  public authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.taskService = new TaskService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.get(`${this.path}`, this.taskService.Inicial);
    this.router.get(`${this.path}logout`, this.authService.Logout);

    this.router.get(`${this.path}login`);
    this.router.route(`${this.path}login/auth`).post(this.authService.login);

    this.router.get(`${this.path}createUser`);
    this.router
      .route(`${this.path}createUser/auth`)
      .post(this.authService.create);

    this.router.get(`${this.path}users`);
    this.router.route(`${this.path}users`).get(this.taskService.Users);
  }
}
