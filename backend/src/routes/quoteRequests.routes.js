import { Router } from 'express';

import { createQuoteRequest } from '../controllers/quoteRequests.controller.js';

const router = Router();

router.post('/', createQuoteRequest);

export default router;