import { Model } from "mongoose";

export default class Service {
  private model;
  constructor(model: Model<any>) {
    this.model = model;
  }

  async create(data: Object): Promise<any> {
    const created = await this.model.create(data);
    return created;
  }

  async find(query: Object): Promise<any> {
    const found = await this.model.find(query);
    return found;
  }

  async update(_id: String, data: Object) {
    const updated = await this.model.updateOne({ _id }, data, {
      new: true,
    });
    return updated;
  }
}
