import mongoose from 'mongoose';

interface ISession {
    user: mongoose.Types.ObjectId;
    token: string;
    tokenId: string;
}

export default class Model {
  private schema = new mongoose.Schema<ISession>({
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
  });

  private sessionModel: mongoose.Model<ISession> = mongoose.model<ISession>('session', this.schema);

  public getSessionModel(): mongoose.Model<ISession> {
    return this.sessionModel;
  }
}
