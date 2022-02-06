import BaseService from '../Base/service';
import UserModel from './model';

const userModel = new UserModel();
export default class Service extends BaseService {
  constructor() {
    super(userModel.getUserModel());
  }
}
