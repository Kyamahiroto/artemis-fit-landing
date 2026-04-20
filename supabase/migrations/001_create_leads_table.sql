-- ===================================================================
-- ARTEMIS FIT - LEADS TABLE MIGRATION
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ===================================================================

-- Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  source_tool TEXT NOT NULL,
  tool_results JSONB,
  quiz_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  guide_accessed BOOLEAN DEFAULT FALSE,
  guide_accessed_at TIMESTAMPTZ,
  UNIQUE(email)
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy: Only service role can insert/select (Edge Function uses service role key)
-- No anon access needed since we use the Edge Function as middleware
CREATE POLICY "Service role full access" ON public.leads
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

-- Create index on source_tool for analytics
CREATE INDEX IF NOT EXISTS idx_leads_source_tool ON public.leads (source_tool);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
