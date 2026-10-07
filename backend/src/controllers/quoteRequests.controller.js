import * as quoteRequestsService from '../services/quoteRequests.service.js';
import {
  isNonEmptyString,
  isValidEmail,
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

const MAX_MESSAGE_LENGTH = 1000;
const MAX_PHONE_LENGTH = 40;

/**
 * Crea de forma transaccional un lead y su cotización asociada.
 *
 * Body esperado:
 * {
 *   lead:  { full_name, company_name?, email?, phone?, message?, source? },
 *   quote: { project_type, sections_count?, estimated_min, estimated_max,
 *            estimated_weeks_min?, estimated_weeks_max?, status?, notes? }
 * }
 */
export async function createQuoteRequest(req, res, next) {
  try {
    const body = req.body ?? {};
    const leadBody = body.lead ?? {};
    const quoteBody = body.quote ?? {};

    const fullName = toNullableString(leadBody.full_name);
    const companyName = toNullableString(leadBody.company_name);
    const email = toNullableString(leadBody.email);
    const phone = toNullableString(leadBody.phone);
    const message = toNullableString(leadBody.message);
    const source = toNullableString(leadBody.source) ?? 'web_quote';

    const projectType = toNullableString(quoteBody.project_type);
    const sectionsCount = toIntegerOrNull(quoteBody.sections_count);
    const estimatedMin = toNumberOrNull(quoteBody.estimated_min);
    const estimatedMax = toNumberOrNull(quoteBody.estimated_max);
    const weeksMin = toIntegerOrNull(quoteBody.estimated_weeks_min);
    const weeksMax = toIntegerOrNull(quoteBody.estimated_weeks_max);
    const notes = toNullableString(quoteBody.notes);
    const status = toNullableString(quoteBody.status) ?? 'draft';

    const errors = [];

    if (!isNonEmptyString(leadBody.full_name)) {
      errors.push('full_name es obligatorio.');
    }

    if (!email && !phone) {
      errors.push('Debes proporcionar al menos email o phone.');
    }

    if (email && !isValidEmail(email)) {
      errors.push('email no tiene un formato válido.');
    }

    if (phone && phone.length > MAX_PHONE_LENGTH) {
      errors.push(`phone no puede superar los ${MAX_PHONE_LENGTH} caracteres.`);
    }

    if (message && message.length > MAX_MESSAGE_LENGTH) {
      errors.push(`message no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`);
    }

    if (!isNonEmptyString(quoteBody.project_type)) {
      errors.push('project_type es obligatorio.');
    }

    if (estimatedMin === null || estimatedMin < 0) {
      errors.push('estimated_min es obligatorio y debe ser mayor o igual a 0.');
    }

    if (estimatedMax === null || estimatedMax < 0) {
      errors.push('estimated_max es obligatorio y debe ser mayor o igual a 0.');
    }

    if (
      estimatedMin !== null &&
      estimatedMax !== null &&
      estimatedMax < estimatedMin
    ) {
      errors.push('estimated_max debe ser mayor o igual que estimated_min.');
    }

    if (sectionsCount !== null && sectionsCount < 0) {
      errors.push('sections_count debe ser mayor o igual a 0.');
    }

    if (weeksMin !== null && weeksMin < 0) {
      errors.push('estimated_weeks_min debe ser mayor o igual a 0.');
    }

    if (weeksMax !== null && weeksMax < 0) {
      errors.push('estimated_weeks_max debe ser mayor o igual a 0.');
    }

    if (weeksMin !== null && weeksMax !== null && weeksMax < weeksMin) {
      errors.push('estimated_weeks_max debe ser mayor o igual que estimated_weeks_min.');
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      errors.push(`status debe ser uno de: ${ALLOWED_STATUSES.join(', ')}.`);
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validación fallida.', details: errors });
    }

    const result = await quoteRequestsService.createQuoteRequest({
      lead: {
        full_name: fullName,
        company_name: companyName,
        email,
        phone,
        message,
        source,
      },
      quote: {
        project_type: projectType,
        sections_count: sectionsCount,
        estimated_min: estimatedMin,
        estimated_max: estimatedMax,
        estimated_weeks_min: weeksMin,
        estimated_weeks_max: weeksMax,
        status,
        notes,
      },
    });

    return res.status(201).json({ data: result });
  } catch (error) {
    return next(error);
  }
}