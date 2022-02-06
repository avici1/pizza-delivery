import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import validator from '../Helpers/validator';

export default class Validation {
  private loginSchema: joi.Schema;

  private signupSchema: joi.Schema;

  constructor() {
    this.signupSchema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required().min(6),
      name: joi.string().required(),
      streetAddress: joi.string().required(),
    });
    this.loginSchema = joi.object().keys({
      email: joi.string().email().required().min(6),
      password: joi.string().required(),
    });
  }

  validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    validator(this.loginSchema, req.body, res, next);
  };

  validateSignup = (req: Request, res: Response, next: NextFunction): void => {
    validator(this.signupSchema, req.body, res, next);
  };
}
