import { Request, Response, NextFunction } from 'express';
import Jwt from '../Helpers/jwt';
import out from '../Helpers/out';
import SessionService from '../session/service';

export default class Access {
  private jwt: Jwt;

  private sessionService: SessionService;

  constructor() {
    this.jwt = new Jwt();
    this.sessionService = new SessionService();
  }

  isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const { tokenId } = this.jwt.decode(token as string);
      if (!tokenId) {
        return out(res, 401, undefined, 'Unauthorized', 'MA0-0');
      }
      const session = await this.sessionService.find({ tokenId });
      if (session.length > 0) {
        return next();
      }
      return out(res, 401, undefined, 'Unauthorized', 'MA0-1');
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Internal Server Error', 'MA0-2');
    }
  };
}
