-- Inserir guias base (placeholders) para garantir que os links de e-mail funcionem
-- Se o slug já existir, ele não fará nada (ON CONFLICT DO NOTHING)

INSERT INTO public.guides (title, slug, content, is_published)
VALUES 
  ('Guia: Treino Feminino e Ciclo Menstrual', 'guia-treino-feminino-ciclo', '# Em breve\nConteúdo sendo preparado para você.', true),
  ('Como Treinar de Forma Eficiente', 'como-treinar-eficiente', '# Em breve\nConteúdo sendo preparado para você.', true),
  ('Guia de Proteína para Músculos Femininos', 'guia-proteina-musculo-feminino', '# Em breve\nConteúdo sendo preparado para você.', true),
  ('Guia Completo de Treino Artemis', 'guia-completo-treino-feminino', '# Em breve\nConteúdo sendo preparado para você.', true)
ON CONFLICT (slug) DO NOTHING;
