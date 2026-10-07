-- ============================================================
-- Migración 001 - Esquema inicial del sistema de ventas
-- Tablas: users, services, leads, quotes, quote_items, sales
-- Proyecto de tesis: Predict Sale App
-- ============================================================

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(190) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          VARCHAR(20) NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT users_role_check CHECK (role IN ('admin'))
);

CREATE TABLE services (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  base_price  NUMERIC(12, 2) NOT NULL CHECK (base_price >= 0),
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE leads (
  id           SERIAL PRIMARY KEY,
  full_name    VARCHAR(160) NOT NULL,
  company_name VARCHAR(160),
  email        VARCHAR(190),
  phone        VARCHAR(40),
  message      TEXT,
  source       VARCHAR(60) NOT NULL DEFAULT 'landing',
  status       VARCHAR(20) NOT NULL DEFAULT 'new',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT leads_status_check CHECK (status IN ('new', 'contacted', 'qualified', 'lost')),
  CONSTRAINT leads_contact_check CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE TABLE quotes (
  id                  SERIAL PRIMARY KEY,
  lead_id             INTEGER NOT NULL REFERENCES leads (id) ON DELETE RESTRICT,
  code                VARCHAR(30) NOT NULL UNIQUE,
  project_type        VARCHAR(120) NOT NULL,
  sections_count      INTEGER CHECK (sections_count IS NULL OR sections_count >= 0),
  estimated_min       NUMERIC(12, 2) NOT NULL CHECK (estimated_min >= 0),
  estimated_max       NUMERIC(12, 2) NOT NULL CHECK (estimated_max >= estimated_min),
  estimated_weeks_min INTEGER CHECK (estimated_weeks_min IS NULL OR estimated_weeks_min >= 0),
  estimated_weeks_max INTEGER CHECK (estimated_weeks_max IS NULL OR estimated_weeks_max >= estimated_weeks_min),
  status              VARCHAR(30) NOT NULL DEFAULT 'draft',
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT quotes_status_check CHECK (
    status IN ('draft', 'submitted', 'contacted', 'sent', 'negotiation', 'won', 'lost')
  )
);

CREATE TABLE quote_items (
  id          SERIAL PRIMARY KEY,
  quote_id    INTEGER NOT NULL REFERENCES quotes (id) ON DELETE CASCADE,
  service_id  INTEGER REFERENCES services (id) ON DELETE SET NULL,
  name        VARCHAR(160) NOT NULL,
  description TEXT,
  quantity    INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price  NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  subtotal    NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sales (
  id           SERIAL PRIMARY KEY,
  quote_id     INTEGER REFERENCES quotes (id) ON DELETE SET NULL,
  lead_id      INTEGER REFERENCES leads (id) ON DELETE SET NULL,
  service_name VARCHAR(160) NOT NULL,
  amount       NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  sold_at      DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_quotes_lead_id ON quotes (lead_id);
CREATE INDEX idx_quotes_status ON quotes (status);
CREATE INDEX idx_quote_items_quote_id ON quote_items (quote_id);
CREATE INDEX idx_sales_lead_id ON sales (lead_id);
CREATE INDEX idx_sales_sold_at ON sales (sold_at);