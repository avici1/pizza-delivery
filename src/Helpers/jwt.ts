/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import env from '../Config/env';

interface ISession {
  token: string;
  tokenId: string;
  user: string;
}
export default class Jwt {
  private secret: jwt.Secret;

  constructor() {
    this.secret = env.secret as jwt.Secret;
  }

  public sign(payload: string | object): string {
    const token = jwt.sign(payload, this.secret);
    return token;
  }

  public decode(token: string): ISession {
    const status = jwt.verify(token, this.secret);
    return status as ISession;
  }
}
