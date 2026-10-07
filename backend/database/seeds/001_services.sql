-- ============================================================
-- Seed: servicios base del sistema
-- IMPORTANTE: los precios aquí son VALORES TEMPORALES DE PRUEBA.
-- NO corresponden a las tarifas reales de la empresa.
-- ============================================================

INSERT INTO services (name, description, base_price, is_active)
VALUES
  ('Landing Page', 'Página de aterrizaje enfocada en una campaña o producto.', 1200.00, TRUE),
  ('Web Corporativa', 'Sitio web empresarial informativo con varias secciones.', 1800.00, TRUE),
  ('Ecommerce', 'Tienda online con catálogo de productos y carrito de compras.', 3500.00, TRUE),
  ('Sistema Web Personalizado', 'Aplicación web a medida para procesos internos del negocio.', 6000.00, TRUE)
ON CONFLICT (name) DO NOTHING;