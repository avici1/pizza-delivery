import mongoose from 'mongoose';
import ShoppingCartModel from './model';
import BaseService from '../Common/service';

const shoppingCartModel = new ShoppingCartModel();
type product = {
  id: mongoose.Types.ObjectId,
  qty: Number,
  priceId: string,

}

export interface IShoppingCart {
  products: product[];
  user: mongoose.Types.ObjectId;
  total: Number;
}
export default class ShoppingCartService extends BaseService {
  private shoppingCartModel: mongoose.Model<IShoppingCart>;

  constructor() {
    super(shoppingCartModel.getShoppingCartModel());
    this.shoppingCartModel = shoppingCartModel.getShoppingCartModel();
  }

  find = async (query: Object): Promise<any> => {
    const found = await this.shoppingCartModel.find(query).populate('products.id');
    return found;
  };
}
