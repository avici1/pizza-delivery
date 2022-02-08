import { Request, Response } from 'express';
import { resolve } from 'path';
import out from '../Common/Helpers/out';
import Stripe from '../Common/Helpers/stripe';
import ShoppingCartService from '../ShoppingCart/service';
import Mailer from '../Common/Helpers/mailer';

export default class Orders {
  private stripe: Stripe;

  private shoppingCartService: ShoppingCartService;

  private Mailer: Mailer;

  constructor() {
    this.stripe = new Stripe();
    this.shoppingCartService = new ShoppingCartService();
    this.Mailer = new Mailer();
  }

  webhook = async (req: Request, res: Response) => {
    try {
      const signature = req.headers['stripe-signature'];
      const event = this.stripe.constructEvent(
        req.body,
        signature as string,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
      type EmailToSend = [object, { to: string, subject: string }, { path: string }];
      const { data } = event;
      const eventType = event.type;
      console.log(data);
      switch (eventType) {
        case 'charge.succeeded':
          if (data.object.amount_due === data.object.amount_paid) {
            const { metadata } = await this.stripe.getPaymentIntent(data.object.payment_intent);
            const cart = await this.shoppingCartService.find({ _id: metadata.cartId });
            const nDate = new Date(data.object.created);
            const products = cart[0].products.map((element: any) => ({
              name: element.id.name,
              price: element.id.price * element.qty,
              qty: element.qty,
            }));
            console.log(products);
            const emailToSend: EmailToSend = [{
              name: data.object.billing_details.name,
              id: data.object.balance_transaction,
              date: nDate.toLocaleString(),
              total: data.object.amount / 100,
              data: products,
            }, {
              to: data.object.billing_details.email,
              subject: 'Order Confirmation',
            }, { path: resolve('src/Common/Public/templates/reciept.ejs') }];
            this.Mailer.sendMail(emailToSend);
          } else {
            console.log('Invoice still has balance');
          }
          break;
        case 'invoice.payment_failed':
          console.log('Payment failed');
          break;
        default:
        // Unhandled event type
      }
      return out(res, 200, undefined, 'Webhook received', undefined);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Something went wrong', 'CO1-0');
    }
  };
}
