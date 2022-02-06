import mongoose from 'mongoose';

type product = {
    id: mongoose.Types.ObjectId,
    qty: Number
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

  private userModel: mongoose.Model<IProduct> = mongoose.model<IProduct>(
    'User',
    this.schema,
  );

  public getShoppingCartModel(): mongoose.Model<IProduct> {
    return this.userModel;
  }

  public getSchema(): mongoose.Schema<IProduct> {
    return this.schema;
  }
}
