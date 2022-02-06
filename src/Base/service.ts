import { Model } from 'mongoose';

export default class Service {
  private model;

  constructor(model: Model<any>) {
    this.model = model;
  }

  create = async (data: Object) => {
    const created = await this.model.create(data);
    return created;
  };

  find = async (query: Object): Promise<any> => {
    const found = await this.model.find(query);
    return found;
  };

  update = async (_id: String, data: Object) => {
    const updated = await this.model.updateOne({ _id }, data, {
      new: true,
    });
    return updated;
  };

  delete = async (_id: String) => {
    const deleted = await this.model.deleteOne({ _id });
    return deleted;
  };
}
