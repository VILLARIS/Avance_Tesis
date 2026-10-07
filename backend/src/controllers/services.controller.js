import * as servicesService from '../services/services.service.js';

export async function listServices(req, res, next) {
  try {
    const services = await servicesService.listActiveServices();
    return res.json({ data: services });
  } catch (error) {
    return next(error);
  }
}