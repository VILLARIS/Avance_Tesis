import * as leadsService from '../services/leads.service.js';
import * as quotesService from '../services/quotes.service.js';
import {
  isNonEmptyString,
  toIntegerOrNull,
  toNullableString,
  toNumberOrNull,
} from '../utils/validators.js';

const ALLOWED_STATUSES = [
  'draft',
  'submitted',
  'contacted',
  'sent',
  'negotiation',
  'won',
  'lost',
];

export async function listQuotes(req, res, next) {
  try {
    const quotes = await quotesService.listQuotes();
    return res.json({ data: quotes });
  } catch (error) {
    return next(error);
  }
}

export async function createQuote(req, res, next) {
  try {
    const body = req.body ?? {};

    const leadId = toIntegerOrNull(body.lead_id);
    const projectType = toNullableString(body.project_type);
    const sectionsCount = toIntegerOrNull(body.sections_count);
    const estimatedMin = toNumberOrNull(body.estimated_min);
    const estimatedMax = toNumberOrNull(body.estimated_max);
    const weeksMin = toIntegerOrNull(body.estimated_weeks_min);
    const weeksMax = toIntegerOrNull(body.estimated_weeks_max);
    const notes = toNullableString(body.notes);
    const status = toNullableString(body.status) ?? 'draft';

    const errors = [];

    if (leadId === null || leadId <= 0) {
      errors.push('lead_id es obligatorio y debe ser un entero positivo.');
    }

    if (!isNonEmptyString(body.project_type)) {
      errors.push('project_type es obligatorio.');
    }

    if (estimatedMin === null || estimatedMin < 0) {
      errors.push('estimated_min es obligatorio y debe ser un número mayor o igual a 0.');
    }

    if (estimatedMax === null || estimatedMax < 0) {
      errors.push('estimated_max es obligatorio y debe ser un número mayor o igual a 0.');
    }

    if (
      estimatedMin !== null &&
      estimatedMax !== null &&
      estimatedMax < estimatedMin
    ) {
      errors.push('estimated_max debe ser mayor o igual que estimated_min.');
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      errors.push(`status debe ser uno de: ${ALLOWED_STATUSES.join(', ')}.`);
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validación fallida.', details: errors });
    }

    const leadExists = await leadsService.findLeadById(leadId);
    if (!leadExists) {
      return res.status(400).json({
        error: 'Validación fallida.',
        details: [`No existe un lead con id ${leadId}.`],
      });
    }

    const quote = await quotesService.createQuote({
      lead_id: leadId,
      project_type: projectType,
      sections_count: sectionsCount,
      estimated_min: estimatedMin,
      estimated_max: estimatedMax,
      estimated_weeks_min: weeksMin,
      estimated_weeks_max: weeksMax,
      status,
      notes,
    });

    return res.status(201).json({ data: quote });
  } catch (error) {
    return next(error);
  }
}