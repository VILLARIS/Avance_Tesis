const POSTGRES_UNIQUE_VIOLATION = '23505';
const POSTGRES_FOREIGN_KEY_VIOLATION = '23503';
const POSTGRES_CHECK_VIOLATION = '23514';
const POSTGRES_INVALID_TEXT_REPRESENTATION = '22P02';

export function errorHandler(error, req, res, next) {
  console.error('[error]', error.message);

  if (error.code === POSTGRES_UNIQUE_VIOLATION) {
    return res.status(409).json({
      error: 'El registro ya existe (valor duplicado).',
      details: [error.detail ?? error.message],
    });
  }

  if (error.code === POSTGRES_FOREIGN_KEY_VIOLATION) {
    return res.status(400).json({
      error: 'Referencia inválida a un registro relacionado.',
      details: [error.detail ?? error.message],
    });
  }

  if (error.code === POSTGRES_CHECK_VIOLATION) {
    return res.status(400).json({
      error: 'Los datos no cumplen una restricción de la base de datos.',
      details: [error.detail ?? error.message],
    });
  }

  if (error.code === POSTGRES_INVALID_TEXT_REPRESENTATION) {
    return res.status(400).json({
      error: 'Formato de dato inválido.',
      details: [error.message],
    });
  }

  return res.status(500).json({
    error: 'Error interno del servidor.',
    details: [error.message],
  });
}