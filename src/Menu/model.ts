import mongoose from 'mongoose';

interface IMenuItem {
    price: number;
    name: string;
    description: string;
}

export default class Model {
  private schema = new mongoose.Schema<IMenuItem>({
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

  private menuModel: mongoose.Model<IMenuItem> = mongoose.model<IMenuItem>(
    'menu',
    this.schema,
  );

  public getMenuItemModel(): mongoose.Model<IMenuItem> {
    return this.menuModel;
  }
}
