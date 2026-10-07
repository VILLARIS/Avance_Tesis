import * as salesService from '../services/sales.service.js';

export async function listSales(req, res, next) {
  try {
    const sales = await salesService.listSales();
    return res.json({ data: sales });
  } catch (error) {
    return next(error);
  }
}