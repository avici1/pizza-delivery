import { Router } from 'express';
import Access from '../Common/Middleware/access';
import OrderController from './controller';

const access = new Access();
const orderController = new OrderController();
const router = Router();

router.post('/', [access.isLoggedIn, orderController.settleCart]);

export default router;
