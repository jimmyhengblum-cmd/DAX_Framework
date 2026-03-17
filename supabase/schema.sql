-- ============================================
-- DAX Framework — Supabase Schema
-- À exécuter dans l'éditeur SQL de Supabase
-- ============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- CATEGORIES
-- ─────────────────────────────────────────
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),          -- nom d'icône Lucide (ex: "calculator")
  color VARCHAR(20),         -- couleur hex (ex: "#3B82F6")
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- MEASURES
-- ─────────────────────────────────────────
CREATE TABLE measures (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  use_cases TEXT,
  script_template TEXT NOT NULL,       -- SUM(<table_column_1>)
  script_example TEXT NOT NULL,        -- SUM(Sales[Amount])
  example_table JSONB,                 -- { headers: [], rows: [] }
  category_id UUID REFERENCES categories(id),
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft','review','published','rejected')),
  difficulty VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
  view_count INTEGER DEFAULT 0,
  copy_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- PARAMETERS
-- ─────────────────────────────────────────
CREATE TABLE parameters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  measure_id UUID REFERENCES measures(id) ON DELETE CASCADE,
  key VARCHAR(100) NOT NULL,           -- "table_column_1"
  label VARCHAR(255) NOT NULL,         -- "Colonne à additionner"
  placeholder VARCHAR(255),            -- "Sales[Amount]"
  description TEXT,
  type VARCHAR(30) DEFAULT 'table_column' CHECK (type IN ('table_column','table','value','text')),
  required BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────
-- TAGS
-- ─────────────────────────────────────────
CREATE TABLE tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE measure_tags (
  measure_id UUID REFERENCES measures(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (measure_id, tag_id)
);

-- ─────────────────────────────────────────
-- DAX FUNCTIONS
-- ─────────────────────────────────────────
CREATE TABLE dax_functions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  docs_url TEXT,                        -- lien Microsoft Learn
  category VARCHAR(100)
);

CREATE TABLE measure_dax_functions (
  measure_id UUID REFERENCES measures(id) ON DELETE CASCADE,
  function_id UUID REFERENCES dax_functions(id) ON DELETE CASCADE,
  PRIMARY KEY (measure_id, function_id)
);

-- ─────────────────────────────────────────
-- VIEWS (pour les requêtes enrichies)
-- ─────────────────────────────────────────
CREATE VIEW measures_with_meta AS
SELECT
  m.*,
  c.name AS category_name,
  c.slug AS category_slug,
  c.icon AS category_icon,
  c.color AS category_color,
  COALESCE(
    JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', t.name, 'slug', t.slug)) 
    FILTER (WHERE t.id IS NOT NULL), '[]'
  ) AS tags,
  COALESCE(
    JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', df.name, 'docs_url', df.docs_url))
    FILTER (WHERE df.id IS NOT NULL), '[]'
  ) AS dax_functions
FROM measures m
LEFT JOIN categories c ON m.category_id = c.id
LEFT JOIN measure_tags mt ON m.id = mt.measure_id
LEFT JOIN tags t ON mt.tag_id = t.id
LEFT JOIN measure_dax_functions mdf ON m.id = mdf.measure_id
LEFT JOIN dax_functions df ON mdf.function_id = df.id
WHERE m.status = 'published'
GROUP BY m.id, c.id;

-- ─────────────────────────────────────────
-- FUNCTION : incrémenter les compteurs
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION increment_copy_count(measure_id UUID)
RETURNS VOID AS $$
  UPDATE measures SET copy_count = copy_count + 1 WHERE id = measure_id;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION increment_view_count(measure_id UUID)
RETURNS VOID AS $$
  UPDATE measures SET view_count = view_count + 1 WHERE id = measure_id;
$$ LANGUAGE SQL;

-- ─────────────────────────────────────────
-- TRIGGER : updated_at automatique
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER measures_updated_at
  BEFORE UPDATE ON measures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────
-- RLS (Row Level Security) - lecture publique
-- ─────────────────────────────────────────
ALTER TABLE measures ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE parameters ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE measure_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE dax_functions ENABLE ROW LEVEL SECURITY;
ALTER TABLE measure_dax_functions ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour tout le monde (MVP sans auth)
CREATE POLICY "Public read" ON measures FOR SELECT USING (status = 'published');
CREATE POLICY "Public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON parameters FOR SELECT USING (true);
CREATE POLICY "Public read" ON tags FOR SELECT USING (true);
CREATE POLICY "Public read" ON measure_tags FOR SELECT USING (true);
CREATE POLICY "Public read" ON dax_functions FOR SELECT USING (true);
CREATE POLICY "Public read" ON measure_dax_functions FOR SELECT USING (true);
