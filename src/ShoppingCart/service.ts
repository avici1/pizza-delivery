import ShoppingCartModel from './model';
import BaseService from '../Common/service';

const shoppingCartModel = new ShoppingCartModel();
export default class ShoppingCartService extends BaseService {
  constructor() {
    super(shoppingCartModel.getShoppingCartModel());
  }
}
