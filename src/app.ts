import express, { Application } from 'express';
import helmet from 'helmet';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import cors from 'cors';
import dbInit from './Config/db';
import env from './Config/env';
// import BaseRoute from './Base/routes';
import UsersRoute from './Users/routes';

dbInit();

const app: Application = express();
app.use(express.json());
// const routes: Array<BaseRoute> = [];
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

app.use('/users', UsersRoute);
app.use(expressWinston.logger(loggerOptions));
app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(helmet());
app.listen(env.PORT || 8000, (): void => {
  debugLog(`Server is running on port ${app.get('port')}`);
});
