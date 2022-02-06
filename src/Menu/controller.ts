import BaseController from '../Base/controller';
import MenuItemService from './service';

export default class Controller extends BaseController {
  menuItemService: MenuItemService;

  constructor() {
    super('CM');
    this.menuItemService = new MenuItemService();
  }
}
