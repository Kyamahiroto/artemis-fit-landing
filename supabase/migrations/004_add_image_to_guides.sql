-- Adicionar a coluna image_url para imagem de destaque
ALTER TABLE public.guides ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Garantir que a coluna slug seja única (já estava no 003 mas reforçando)
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'guides_slug_key') THEN
    ALTER TABLE public.guides ADD CONSTRAINT guides_slug_key UNIQUE (slug);
  END IF;
END $$;
