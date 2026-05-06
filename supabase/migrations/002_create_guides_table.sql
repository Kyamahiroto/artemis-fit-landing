-- ===================================================================
-- Artemis Fit Pro - GUIDES TABLE MIGRATION
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ===================================================================

-- Create the guides table
CREATE TABLE IF NOT EXISTS public.guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

-- Create policy: Public users can read only published guides
CREATE POLICY "Public read access to published guides" ON public.guides
  FOR SELECT
  USING (is_published = TRUE);

-- Create policy: Authenticated users (Admin) get full access
CREATE POLICY "Admin full access" ON public.guides
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Also give Admin read access to leads
CREATE POLICY "Admin read access to leads" ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Set up auto-update for updated_at
CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON public.guides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
