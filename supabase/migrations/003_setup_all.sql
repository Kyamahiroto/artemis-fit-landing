-- ===================================================================
-- ARTEMIS FIT - SETUP COMPLETO (LEADS + GUÍAS)
-- Cole e rode este arquivo inteiro no SQL Editor do Supabase
-- ===================================================================

-- 1. FUNÇÃO DE ATUALIZAÇÃO DE DATA (Geral)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. TABELA DE LEADS
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source_tool TEXT NOT NULL,
  tool_results JSONB,
  quiz_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  guide_accessed BOOLEAN DEFAULT FALSE,
  guide_accessed_at TIMESTAMPTZ
);

-- Habilitar Segurança (RLS) na tabela leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Índices da tabela leads
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_source_tool ON public.leads (source_tool);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);

-- Trigger de data na tabela leads
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Políticas de RLS da tabela leads
DROP POLICY IF EXISTS "Service role full access" ON public.leads;
CREATE POLICY "Service role full access" ON public.leads
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admin read access to leads" ON public.leads;
CREATE POLICY "Admin read access to leads" ON public.leads
  FOR SELECT USING (auth.role() = 'authenticated');


-- 3. TABELA DE GUIAS (Guides)
CREATE TABLE IF NOT EXISTS public.guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Segurança (RLS) na tabela guides
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

-- Trigger de data na tabela guides
DROP TRIGGER IF EXISTS update_guides_updated_at ON public.guides;
CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON public.guides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Políticas de RLS da tabela guides
DROP POLICY IF EXISTS "Public read access to published guides" ON public.guides;
CREATE POLICY "Public read access to published guides" ON public.guides
  FOR SELECT USING (is_published = TRUE);

DROP POLICY IF EXISTS "Admin full access" ON public.guides;
CREATE POLICY "Admin full access" ON public.guides
  FOR ALL USING (auth.role() = 'authenticated');
