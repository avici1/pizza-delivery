import { Response, Request } from 'express';
import { Model } from 'mongoose';
import Service from './service';
import out from './Helpers/out';

export default class {
  service: Service;

  errorCode: string;

  public getErrorCode(): string {
    return this.errorCode;
  }

  private model = new Model<any>({}, {});

  constructor(errorCode: string) {
    this.service = new Service(this.model);
    this.errorCode = errorCode;
  }

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const added = await this.service.create(req.body);
      if (added) {
        return out(res, 201, added, 'Created', undefined);
      }
      return out(res, 400, undefined, 'Bad Request', `${this.errorCode}0-0`);
    } catch (error) {
      console.log(error);
      return out(
        res,
        500,
        undefined,
        'Internal Server Error',
        `${this.errorCode}0-1`,
      );
    }
  };

  find = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const query = id ? { _id: id } : {};
      const added = await this.service.find(query);
      if (added) {
        return out(res, 200, added, 'OK', undefined);
      }
      return out(res, 404, undefined, 'Not Found', `${this.errorCode}1-0`);
    } catch (error) {
      console.log(error);
      return out(
        res,
        500,
        undefined,
        'Internal Server Error',
        `${this.errorCode}1-1`,
      );
    }
  };

  update = async (req: Request, res: Response): Promise<any> => {
    try {
      const updated = await this.service.update(req.params.id, req.body);
      if (updated.modifiedCount === 0) {
        return out(
          res,
          400,
          undefined,
          'Something went wrong updating',
          `${this.errorCode}2-0`,
        );
      }
      return out(res, 200, updated, 'OK', undefined);
    } catch (error) {
      console.log(error);
      return out(
        res,
        500,
        undefined,
        'Internal Server Error',
        `${this.errorCode}2-1`,
      );
    }
  };

  delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (deleted.deletedCount === 0) {
        return out(
          res,
          400,
          undefined,
          'Something went wrong deleting',
          `${this.errorCode}3-0`,
        );
      }
      return out(res, 200, deleted, 'OK', undefined);
    } catch (error) {
      console.log(error);
      return out(
        res,
        500,
        undefined,
        'Internal Server Error',
        `${this.errorCode}3-1`,
      );
    }
  };
}
