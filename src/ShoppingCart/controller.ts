import { Request, Response } from 'express';
import out from '../Common/Helpers/out';
import ShoppingCartService from './service';
import BaseController from '../Common/controller';

interface EnchancedRequest extends Request {
    user?: string;
}

export default class ShoppingCartController extends BaseController {
  private shoppingCartService: ShoppingCartService;

  constructor() {
    super('CS');
    this.shoppingCartService = new ShoppingCartService();
  }

  public getShoppingCart = async (req: EnchancedRequest, res: Response) => {
    try {
      const shoppingCart = await this.shoppingCartService.find({
        user: req.user,
      });
      if (shoppingCart) {
        return out(res, 201, shoppingCart, 'Shopping cart found', undefined);
      }
      return out(res, 400, undefined, 'Shopping cart not found', `${this.getErrorCode()}0-0`);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Internal server error', `${this.getErrorCode()}0-1`);
    }
  };

  public addShoppingCart = async (req: EnchancedRequest, res: Response) => {
    try {
      const shoppingCart = await this.shoppingCartService.create({
        ...req.body,
        user: req.user,
      });
      if (shoppingCart) {
        return out(res, 201, shoppingCart, 'Shopping cart created', undefined);
      }
      return out(res, 404, undefined, 'Shopping cart not created', `${this.getErrorCode()}1-0`);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Internal server error', `${this.getErrorCode()}1-1`);
    }
  };
}
