import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://artemisfit.online';

// Static routes from App.tsx
const staticRoutes = [
  '',
  '/privacidade',
  '/termos',
  '/cookies',
  '/tecnologia',
  '/guia',
  '/guia/ciclo-e-treino',
  '/guia/gerador-de-treino',
  '/guia/calculadora-proteina',
  '/guia/diagnostico-treino',
  '/guia/seu-guia',
];

// Slugs from guideTipsData.ts (manually extracted for stability)
const tipSlugs = [
  'como-adaptar-treino-fase-lutea',
  'como-adaptar-cardio-fase-folicular',
  'treino-forca-fase-ovulatoria',
  'proteina-mulheres-quanto-comer',
  'sono-e-hipertrofia-feminina',
  'overtraining-sinais-mulheres',
  'fase-menstrual-pode-treinar',
  'retencao-liquido-fase-lutea',
];

async function generateSitemap() {
  console.log('🚀 Iniciando geração do sitemap...');
  
  const allRoutes = [...staticRoutes.map(r => `${BASE_URL}${r}`)];
  
  // Add tip routes
  tipSlugs.forEach(slug => {
    allRoutes.push(`${BASE_URL}/guia/dicas/${slug}`);
  });

  // Fetch dynamic guides from Supabase
  try {
    const supabaseUrl = 'https://nyytfhdsybxoovxmeffr.supabase.co';
    const supabaseKey = 'sb_publishable_f09s_K7MIvdEHlCyyHDiXg_boZdWC3z';
    
    console.log('📡 Buscando guias dinâmicos do Supabase...');
    const response = await fetch(`${supabaseUrl}/rest/v1/guides?select=slug&is_published=eq.true`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    if (response.ok) {
      const guides = await response.json();
      console.log(`✅ ${guides.length} guias encontrados.`);
      guides.forEach(g => {
        // Correct path for dynamic guides in App.tsx is /guia/:slug
        allRoutes.push(`${BASE_URL}/guia/${g.slug}`);
      });
    } else {
      console.warn('⚠️ Falha ao buscar guias do Supabase. Usando apenas rotas estáticas.');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error.message);
  }

  // Remove duplicates
  const uniqueRoutes = [...new Set(allRoutes)];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes.map(route => `  <url>
    <loc>${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === BASE_URL ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  
  // Ensure public directory exists (though it should in this project)
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, sitemap);
  console.log(`✨ Sitemap gerado com sucesso em: ${outputPath}`);
  console.log(`🔗 Total de URLs: ${uniqueRoutes.length}`);
}

generateSitemap();
