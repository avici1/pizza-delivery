import mongoose from 'mongoose';

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

export default class Model {
  private schema = new mongoose.Schema<IShoppingCart>({
    products: [{
      id: {
        type: mongoose.Types.ObjectId,
        ref: 'menu',
      },
      qty: Number,
      priceId: String,
    }],
    user: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  });

  private shoppingCartModel: mongoose.Model<IShoppingCart> = mongoose.model<IShoppingCart>(
    'ShoppingCart',
    this.schema,
  );

  public getShoppingCartModel(): mongoose.Model<IShoppingCart> {
    return this.shoppingCartModel;
  }

  public getSchema(): mongoose.Schema<IShoppingCart> {
    return this.schema;
  }
}
