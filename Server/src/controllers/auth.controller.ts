import * as express from 'express';

import TaskService from '../services/task.services';
import adminAuth from '../middleware/auth.middleware';
import AuthService from '../services/auth.service';

export default class AuthController {
  public router = express.Router();
  public path = '/api/auth/';
  private authService: AuthService;
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
    this.authService = new AuthService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.get(`${this.path}`, this.taskService.Inicial);
    this.router.route(`${this.path}login`).post(this.authService.login);
    this.router.route(`${this.path}createUser`).post(this.authService.create);
    this.router
      .route(`${this.path}users`)
      .get(adminAuth, this.authService.Users);
    this.router.get(`${this.path}logout`, this.authService.Logout);
  }
}
