import BaseController from '../Common/controller';
import MenuItemService from './service';
import out from '../Common/Helpers/out';

export default class Controller extends BaseController {
  menuItemService: MenuItemService;

  constructor() {
    super('CM');
    this.menuItemService = new MenuItemService();
  }

  getMenuItems = async (req: any, res: any) => {
    try {
      const menuItems = await this.menuItemService.find({});
      if (menuItems.length > 0) {
        return out(res, 200, menuItems, 'Menu Items found', undefined);
      }
      return out(res, 404, undefined, 'Menu Items not found', `${this.getErrorCode}0-0`);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Internal Server Error', `${this.getErrorCode}0-1`);
    }
  };

  addMenuItem = async (req: any, res: any) => {
    try {
      const menuItem = await this.menuItemService.create(req.body);
      return out(res, 201, menuItem, 'Menu Item created', undefined);
    } catch (error) {
      console.log(error);
      return out(res, 500, undefined, 'Internal Server Error', `${this.getErrorCode}0-1`);
    }
  };
}
