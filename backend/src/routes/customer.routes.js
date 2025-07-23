import express from 'express';

import { searchBarbers } from '../controllers/customer.controller.js';

const router = express.Router();

router.get('/search', searchBarbers);

export default router;
