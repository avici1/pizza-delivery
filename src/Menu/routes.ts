import { Router } from 'express';
import MenuItemController from './controller';
import MenuItemValidation from './validation';

const router = Router();
const menuItemController = new MenuItemController();
const menuValidation = new MenuItemValidation();

router.get('/all', menuItemController.find);
router.get('/:id', menuItemController.find);
router.post('/add', [menuValidation.validateAdd, menuItemController.create]);

export default router;
