import express from 'express';
import { createAppointment, getBarberAppointments, getCustomerAppointments } from '../controllers/appointment.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/appointments', authMiddleware, createAppointment);
router.get('/customer/appointments', authMiddleware, getCustomerAppointments);
router.get('/barber/appointments', authMiddleware, getBarberAppointments);

export default router;
