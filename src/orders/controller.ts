import { Request, Response } from 'express';
// import { v4 } from 'uuid';
import ShoppingCartService from '../ShoppingCart/service';
import UserService from '../Users/service';
import out from '../Common/Helpers/out';
import Stripe from '../Common/Helpers/stripe';

export default class Orders {
  private shoppingCartService: ShoppingCartService;

  private stripe: Stripe;

  private userService: UserService;

  constructor() {
    this.shoppingCartService = new ShoppingCartService();
    this.stripe = new Stripe();
    this.userService = new UserService();
  }

  settleCart = async (req: Request, res: Response) => {
    try {
      const { cartId } = req.body;
      const cart = await this.shoppingCartService.find({ _id: cartId });
      const user = await this.userService.find({ _id: cart[0].user });
      const lineItems = cart[0]
        .products
        .map((item: any) => ({ price: item.priceId, quantity: item.qty }));
      const payLink = await this.stripe.charge({
        customer: user[0].stripeCustomerId,
        lineItems,
      });
      return out(res, 200, payLink, 'Payment done', undefined);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Something went wrong', 'CO0-0');
    }
  };
}
