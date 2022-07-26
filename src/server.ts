import App from './App';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';

import HomeController from './controllers/HomeController';

const app = new App({
  port: 3000,
  middlewares: [
    morgan('dev'),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json()
  ],
  controllers: [new HomeController()]
});

app.listen();
