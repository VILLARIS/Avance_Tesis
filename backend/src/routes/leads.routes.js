import { Router } from 'express';

import { createLead, listLeads } from '../controllers/leads.controller.js';

const router = Router();

router.get('/', listLeads);
router.post('/', createLead);

export default router;