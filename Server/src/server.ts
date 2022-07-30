import App from './app.config';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import myMiddleware from './middleware/log.middleware';
import TaskController from './controllers/task.controller';
import adminAuth from './middleware/auth.middleware';

const app = new App({
  port: 3333,
  middlewares: [
    morgan('dev'),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(),
    cookieParser(),
    myMiddleware
    // adminAuth
  ],
  controllers: [new TaskController()]
});

app.listen();
