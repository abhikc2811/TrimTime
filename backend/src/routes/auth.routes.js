import express from 'express';
import multer from 'multer';
import { sendOtp, verifyOtp, register, login, logout, checkAuth } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', upload.single('profilePic'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', authMiddleware, checkAuth);

export default router;
