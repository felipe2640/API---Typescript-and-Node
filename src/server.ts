import App from './app.config';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import myMiddleware from './middleware/log.middleware';
import TaskController from './controllers/task.controller';

const app = new App({
  port: 3000,
  middlewares: [
    morgan('dev'),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(),
    myMiddleware
  ],
  controllers: [new TaskController()]
});

app.listen();
