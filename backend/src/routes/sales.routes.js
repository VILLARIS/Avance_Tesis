import { Router } from 'express';

import { listSales } from '../controllers/sales.controller.js';

const router = Router();

router.get('/', listSales);

export default router;