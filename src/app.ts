import express, { Application } from 'express';
import helmet from 'helmet';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import cors from 'cors';
import dbInit from './Common/Config/db';
import env from './Common/Config/env';
import UsersRoute from './Users/routes';
import MenuRoute from './Menu/routes';
import ShoppingCartRoute from './ShoppingCart/routes';
import OrdersRoute from './orders/routes';
import WebhooksRoute from './webhooks/routes';

dbInit();

// initiate express
const app: Application = express();

// raw express body parser
app.use('/webhooks', WebhooksRoute);

//  setting the JSON parser
app.use(express.json());

// configuring logging and debugging

const debugLog: debug.IDebugger = debug('app:log');
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
};
if (!env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// registering routes
app.use('/users', UsersRoute);
app.use('/menu', MenuRoute);
app.use('/shoppingcart', ShoppingCartRoute);
app.use('/orders', OrdersRoute);

// utility middleware
app.use(expressWinston.logger(loggerOptions));
app.use(cors());
app.use(helmet());

// creating an express server
app.listen(env.PORT || 8000, (): void => {
  debugLog(`Server is running on port ${app.get('port')}`);
});
