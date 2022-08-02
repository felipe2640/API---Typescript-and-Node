import App from './app.config';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import myMiddleware from './middleware/log.middleware';
import TaskController from './controllers/task.controller';
import adminAuth from './middleware/auth.middleware';
import AuthController from './controllers/auth.controller';

const app = new App({
  port: process.env.PORT!,
  middlewares: [
    morgan('dev'),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors({
      origin: `${process.env.CORS_URL}`,
      credentials: true
    }),
    cookieParser(),
    myMiddleware
  ],
  controllers: [new TaskController(), new AuthController()]
});

app.listen();
