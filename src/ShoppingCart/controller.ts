/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import out from '../Common/Helpers/out';
import ShoppingCartService from './service';
import BaseController from '../Common/controller';
import MenuItemService from '../Menu/service';

interface EnchancedRequest extends Request {
    user?: string;
}

export default class ShoppingCartController extends BaseController {
  private shoppingCartService: ShoppingCartService;

  private menuItemService: MenuItemService;

  constructor() {
    super('CS');
    this.shoppingCartService = new ShoppingCartService();
    this.menuItemService = new MenuItemService();
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
      const { products } = req.body;
      let total = 0;
      let iterator = 0;
      while (iterator < products.length) {
        const product = products[iterator];
        const menuItem = await this.menuItemService.find({ _id: product.id });
        total += (menuItem[0].price * product.qty as number);
        iterator += 1;
      }
      const shoppingCart = await this.shoppingCartService.create({
        ...req.body,
        user: req.user,
        total,
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
