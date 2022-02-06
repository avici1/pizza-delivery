import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  streetAddress: string;
  password: string;
}
export default class Model {
  private schema = new mongoose.Schema<IUser>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  private userModel: mongoose.Model<IUser> = mongoose.model<IUser>(
    'User',
    this.schema,
  );

  public getUserModel(): mongoose.Model<IUser> {
    return this.userModel;
  }

  public getSchema(): mongoose.Schema<IUser> {
    return this.schema;
  }
}
