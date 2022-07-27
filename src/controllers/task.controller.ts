import * as express from 'express';

import TaskService from '../services/task.services';
import LoginAuth from '../services/login.service';

export default class TaskController {
  public router = express.Router();
  public path = '/';
  private taskService: TaskService;
  private loginService: LoginAuth;

  constructor() {
    this.loginService = new LoginAuth();
    this.taskService = new TaskService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.get(`${this.path}`, this.taskService.Inicial);
    this.router.get(`${this.path}user`, this.taskService.Users);
    this.router.post(`${this.path}createUser`, this.taskService.create);
    this.router.post(`${this.path}login`, this.loginService.Users);
  }
}
