import BaseService from '../Base/service';
import MenuItemModel from './model';

const menuItemModel = new MenuItemModel();

export default class Service extends BaseService {
  constructor() {
    super(menuItemModel.getMenuItemModel());
  }
}
