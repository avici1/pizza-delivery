import mongoose from 'mongoose';

type product = {
  id: mongoose.Types.ObjectId,
  qty: Number,
  priceId: string,

}

export interface IProduct {
  products: product[];
  user: mongoose.Types.ObjectId;
  total: Number;
}

export default class Model {
  private schema = new mongoose.Schema<IProduct>({
    products: [{
      id: mongoose.Types.ObjectId,
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

  private shoppingCartModel: mongoose.Model<IProduct> = mongoose.model<IProduct>(
    'ShoppingCart',
    this.schema,
  );

  public getShoppingCartModel(): mongoose.Model<IProduct> {
    return this.shoppingCartModel;
  }

  public getSchema(): mongoose.Schema<IProduct> {
    return this.schema;
  }
}
