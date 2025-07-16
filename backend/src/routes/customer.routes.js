import express from 'express';
import multer from 'multer';
import { updateProfile } from '../controllers/customer.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.put('/update', authMiddleware, upload.single('profilePic'), updateProfile);

export default router;
