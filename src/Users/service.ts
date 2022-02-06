import BaseService from '../Common/service';
import UserModel from './model';

const userModel = new UserModel();
export default class Service extends BaseService {
  constructor() {
    super(userModel.getUserModel());
  }
}
