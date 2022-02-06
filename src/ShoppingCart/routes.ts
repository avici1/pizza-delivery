import { Router } from 'express';
import ShoppingCartController from './controller';
import Access from '../Common/Middleware/access';

const router = Router();
const controller = new ShoppingCartController();
const access = new Access();

router.get('/', [access.isLoggedIn, controller.getShoppingCart]);
router.post('/add', [access.isLoggedIn, controller.addShoppingCart]);

export default router;
