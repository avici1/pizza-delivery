import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import validator from '../Helpers/validator';

export default class Validation {
  private addSchema: joi.Schema;

  constructor() {
    this.addSchema = joi.object().keys({
      price: joi.number().required(),
      name: joi.string().required(),
      description: joi.string().required(),
    });
  }

  validateAdd = (req: Request, res: Response, next: NextFunction): void => {
    validator(this.addSchema, req.body, res, next);
  };
}
