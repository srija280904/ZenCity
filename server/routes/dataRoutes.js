import express from 'express';
import { getDashboardData, getReportData } from '../controllers/dataController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardData);
router.get('/reports', protect, getReportData);

export default router;