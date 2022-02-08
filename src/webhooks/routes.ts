import express, { Router } from 'express';
import Controller from './controller';

const router = Router();
const controller = new Controller();

router.use(express.raw({ type: '*/*' }));
router.post('/stripe', [controller.webhook]);

export default router;
