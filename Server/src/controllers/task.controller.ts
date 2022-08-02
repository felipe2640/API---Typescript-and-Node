import * as express from 'express';

import TaskService from '../services/task.services';
import adminAuth from '../middleware/auth.middleware';
import AuthService from '../services/auth.service';

export default class TaskController {
  public router = express.Router();
  public path = '/';

  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.router.get(`${this.path}`, this.taskService.Inicial);
    this.router.get(`${this.path}login`);
    this.router.get(`${this.path}createUser`);
    this.router.get(`${this.path}users`);
  }
}
