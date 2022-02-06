/* eslint-disable no-console */
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import BaseController from '../Common/controller';
import out from '../Common/Helpers/out';
import Jwt from '../Common/Helpers/jwt';
import Bcrypt from '../Common/Helpers/bcrypt';
import UserService from './service';
import SessionService from '../Session/service';

export default class Controller extends BaseController {
  userService: UserService;

  sessionService: SessionService;

  constructor() {
    super('CU');
    this.userService = new UserService();
    this.sessionService = new SessionService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const bcrypt = new Bcrypt(password);

      const user = await this.userService.find({ email });
      if (!user) {
        return out(res, 404, undefined, 'User not found', `${this.getErrorCode()}0-0`);
      }
      const compareStatus = await bcrypt.compare(user[0].password);
      if (!compareStatus) {
        return out(res, 401, undefined, 'Invalid password', `${this.getErrorCode()}0-1`);
      }
      const tokenId = v4();
      const payload = {
        tokenId,
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      const jwt = new Jwt();
      const token = jwt.sign(payload);
      await this.sessionService.create({ user: user[0]._id, token, tokenId });
      return out(res, 200, { token, tokenId }, 'Login success', undefined);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Internal Server Error', `${this.getErrorCode()}0-2`);
    }
  };

  signup = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const bcrypt = new Bcrypt(password);
      const user = await this.userService.find({ email });
      if (user.length > 0) {
        return out(res, 400, undefined, 'User already exists', `${this.getErrorCode()}1-0`);
      }
      const hash = await bcrypt.hash();
      const newUser = await this.userService.create({
        ...req.body,
        password: hash,
      });
      if (newUser) {
        return out(res, 201, newUser, 'User created', undefined);
      }
      return out(res, 500, undefined, 'User not created', `${this.getErrorCode()}1-1`);
    } catch (err) {
      console.log(err);
      return out(res, 500, undefined, 'Internal Server Error', `${this.getErrorCode()}1-2`);
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const { tokenId } = req.params;
      const session = await this.sessionService.find({ tokenId });
      const deleteToken = await this.sessionService.delete(session[0]._id);
      if (deleteToken.deletedCount === 0) {
        return out(res, 400, undefined, 'Something went wrong', `${this.getErrorCode()}2-0`);
      }
      return out(res, 200, undefined, 'Logged out successfully', undefined);
    } catch (err) {
      console.log(err);
      return out(res, 500, undefined, 'Deleted successfully', `${this.getErrorCode}2-1`);
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.find({});
      return out(res, 200, users, 'Users were found', undefined);
    } catch (err) {
      console.log(err);
      return out(res, 500, undefined, 'Something went wrong', 'CU3-0');
    }
  };
}
