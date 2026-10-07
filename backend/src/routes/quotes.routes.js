import { Router } from 'express';

import { createQuote, listQuotes } from '../controllers/quotes.controller.js';

const router = Router();

router.get('/', listQuotes);
router.post('/', createQuote);

export default router;