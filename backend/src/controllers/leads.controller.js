import * as leadsService from '../services/leads.service.js';
import { isNonEmptyString, isValidEmail, toNullableString } from '../utils/validators.js';

export async function listLeads(req, res, next) {
  try {
    const leads = await leadsService.listLeads();
    return res.json({ data: leads });
  } catch (error) {
    return next(error);
  }
}

export async function createLead(req, res, next) {
  try {
    const body = req.body ?? {};

    const fullName = toNullableString(body.full_name);
    const companyName = toNullableString(body.company_name);
    const email = toNullableString(body.email);
    const phone = toNullableString(body.phone);
    const message = toNullableString(body.message);
    const source = toNullableString(body.source) ?? 'landing';

    const errors = [];

    if (!isNonEmptyString(body.full_name)) {
      errors.push('full_name es obligatorio.');
    }

    if (!email && !phone) {
      errors.push('Debes proporcionar al menos email o phone.');
    }

    if (email && !isValidEmail(email)) {
      errors.push('email no tiene un formato válido.');
    }

    if (phone && phone.length > 40) {
      errors.push('phone no puede superar los 40 caracteres.');
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validación fallida.', details: errors });
    }

    const lead = await leadsService.createLead({
      full_name: fullName,
      company_name: companyName,
      email,
      phone,
      message,
      source,
    });

    return res.status(201).json({ data: lead });
  } catch (error) {
    return next(error);
  }
}