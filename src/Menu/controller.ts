import BaseController from '../Common/controller';
import MenuItemService from './service';
import out from '../Common/Helpers/out';
import Stripe from '../Common/Helpers/stripe';

export default class Controller extends BaseController {
  menuItemService: MenuItemService;

  stripeInstance: Stripe;

  constructor() {
    super('CM');
    this.menuItemService = new MenuItemService();
    this.stripeInstance = new Stripe();
  }

  getMenuItems = async (req: any, res: any) => {
    try {
      const menuItems = await this.menuItemService.find({});
      if (menuItems.length > 0) {
        return out(res, 200, menuItems, 'Menu Items found', undefined);
      }
      return out(res, 404, undefined, 'Menu Items not found', `${this.getErrorCode}0-0`);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Internal Server Error', `${this.getErrorCode}0-1`);
    }
  };

  addMenuItem = async (req: any, res: any) => {
    try {
      const product = await this.stripeInstance.createProduct({
        name: req.body.name,
        description: req.body.description,
      });
      const price = await this.stripeInstance.createPrice({
        unit_amount: req.body.price * 100,
        currency: 'USD',
        product: product.id,
        active: true,
      });
      const menuItem = await this.menuItemService.create({
        ...req.body,
        productId: product.id,
        priceId: price.id,
      });
      return out(res, 201, menuItem, 'Menu Item created', undefined);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Internal Server Error', `${this.getErrorCode}0-1`);
    }
  };
}
