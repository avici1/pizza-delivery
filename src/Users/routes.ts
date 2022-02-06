import express from 'express';
import UserController from './controller';
import UserValidation from './validation';

const userController = new UserController();
const userValidation = new UserValidation();
const router = express.Router();

router.post('/login', [userValidation.validateLogin, userController.login]);
router.post('/signup', [userValidation.validateSignup, userController.signup]);
router.delete('/logout/:tokenId', [userController.logout]);
router.get('/', [userController.find]);

export default router;
