import { Router } from 'express';
import MenuItemController from './controller';
import MenuItemValidation from './validation';
import Access from '../Common/Middleware/access';

const router = Router();
const menuItemController = new MenuItemController();
const menuValidation = new MenuItemValidation();
const access = new Access();

router.get('/all', [access.isLoggedIn, menuItemController.getMenuItems]);
router.post('/add', [menuValidation.validateAdd, menuItemController.addMenuItem]);

export default router;
