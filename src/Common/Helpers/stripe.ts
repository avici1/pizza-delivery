import base64 from 'base-64';
import Fetch from './fetch';
import env from '../Config/env';

interface ICharge {
    amount: number;
    currency: string;
    description: string;
    balance_transaction: string;
    reciepient_email: string;
}
export default class Stripe {
  // eslint-disable-next-line class-methods-use-this
  charge = async (raw: ICharge): Promise<any> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(`${env.stripeSecretKey}:`)}`,
    };
    const result = await Fetch(`${env.stripeUrl}/charges`, 'POST', raw, headers);
    return result;
  };
}
