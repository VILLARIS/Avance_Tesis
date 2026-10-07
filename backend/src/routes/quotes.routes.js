import { Router } from 'express';

import { createQuote, listQuotes, updateQuoteStatus } from '../controllers/quotes.controller.js';

const router = Router();

router.get('/', listQuotes);
router.post('/', createQuote);
router.patch('/:id/status', updateQuoteStatus);

export default router;