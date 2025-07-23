import express from 'express';
import { getBarberById } from '../controllers/barber.controller.js';

const router = express.Router();

router.get('/:id', getBarberById);

export default router;