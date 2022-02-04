import express, { Application } from 'express';
import dbInit from './Config/db';
import helmet from 'helmet';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import cors from 'cors';
import env from './Config/env';
import users from './Users/routes';

dbInit();

const app: Application = express();
const debugLog: debug.IDebugger = debug('app:log');
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};
if (!env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}
const UsersRoutes = new users(app);

app.use(express.json());
app.use(expressWinston.logger(loggerOptions));
app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(helmet());
app.use('/users', UsersRoutes.initRoutes)
app.listen(env.PORT || 8000, (): void => {
    console.log(`Server is running on port ${app.get('port')}`);
});
