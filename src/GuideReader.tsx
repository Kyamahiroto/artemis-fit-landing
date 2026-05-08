import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { ArrowLeft, BookOpen, Calendar, Clock, Share2, Bookmark, CheckCircle2, Zap, ArrowRight, Mail, Gift, Flame } from 'lucide-react';
import { SEOHead } from './components/SEOHead';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Guide {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  image_url?: string;
  created_at: string;
  slug: string;
}

export const GuideReader = () => {
  const { slug } = useParams<{ slug: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [recentGuides, setRecentGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchGuideData = async () => {
      setLoading(true);
      
      // Fetch current guide
      const { data: current, error } = await supabase
        .from('guides')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
        
      if (!error && current) {
        setGuide(current);
        
        // Fetch recent guides (excluding current)
        const { data: recents } = await supabase
          .from('guides')
          .select('id, title, slug, image_url, created_at')
          .eq('is_published', true)
          .neq('id', current.id)
          .order('created_at', { ascending: false })
          .limit(4);
          
        if (recents) setRecentGuides(recents);
      }
      setLoading(false);
    };
    
    if (slug) fetchGuideData();
  }, [slug]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-dark w-full flex flex-col items-center justify-center text-white gap-4">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Coletando Inteligência...</p>
        </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-dark w-full flex flex-col items-center justify-center text-white gap-4">
        <BookOpen size={48} className="text-white/20" />
        <h2 className="text-2xl font-bold">Guia não encontrado</h2>
        <Link to="/guia" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Voltar para os Guias
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white font-sans pb-32">
      <SEOHead
        title={`${guide.title} | Artemis Fit App`}
        description={guide.subtitle || `Leia sobre ${guide.title}. Otimize seus treinos e alinhe-os ao seu ciclo.`}
        canonicalUrl={`https://artemisfit.online/guia/${slug}`}
        image={guide.image_url}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": guide.title,
          "description": guide.subtitle,
          "image": guide.image_url,
          "author": {
            "@type": "Organization",
            "name": "Artemis Fit App"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Artemis Fit App",
            "logo": {
              "@type": "ImageObject",
              "url": "https://artemisfit.online/logo.png"
            }
          },
          "datePublished": guide.created_at
        }}
      />

      {/* Hero Header Contextual */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between md:px-12">
        <Link to="/guia" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Ver todos os artigos
        </Link>
        <img src="/logo.png" alt="Artemis Logo" className="h-6 opacity-30 hover:opacity-100 transition-opacity" />
        <div className="flex gap-4">
            <button className="text-white/40 hover:text-primary transition-colors"><Share2 size={18} /></button>
            <button className="text-white/40 hover:text-primary transition-colors"><Bookmark size={18} /></button>
        </div>
      </nav>

      {/* Progress Bar */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1 }}
        className="fixed top-[71px] left-0 h-0.5 bg-primary z-50 shadow-[0_0_10px_rgba(205,255,0,0.5)]" 
      />

      <main className="pt-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-16">
            
            {/* ARTICLE CONTENT */}
            <article>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    {/* Header Info */}
                    <div className="mb-10 text-center lg:text-left">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[10px] text-white/30 mb-6 font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded"><Calendar size={12} className="text-primary" /> {new Date(guide.created_at).toLocaleDateString()}</span>
                            <span className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded"><Clock size={12} className="text-primary" /> 6 min de leitura</span>
                            <span className="flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded">Conteúdo Dinâmico</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight italic">
                            {guide.title}
                        </h1>
                        {guide.subtitle && (
                            <p className="text-xl text-white/40 max-w-2xl leading-relaxed">
                                {guide.subtitle}
                            </p>
                        )}
                    </div>

                    {/* Featured Image */}
                    {guide.image_url && (
                        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 mb-16 relative group">
                            <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-700" />
                            <img src={guide.image_url} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        </div>
                    )}
                    
                    <div className="prose prose-invert prose-p:text-white/60 prose-strong:text-white/90 prose-headings:font-display prose-headings:font-bold prose-lg max-w-none prose-a:text-primary prose-blockquote:border-primary prose-blockquote:bg-white/[0.02]">
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                img: ({node, ...props}) => <img {...props} className="rounded-3xl border border-white/10 my-10 w-full" />,
                                h2: ({node, ...props}) => <h2 {...props} className="text-3xl md:text-4xl mt-16 mb-8 text-white border-b border-white/5 pb-6 italic" />,
                                h3: ({node, ...props}) => <h3 {...props} className="text-2xl mt-12 mb-6 text-white/90" />,
                                p: ({node, ...props}) => <p {...props} className="mb-8 leading-[1.8] text-white/70" />,
                                ul: ({node, ...props}) => <ul {...props} className="list-disc list-outside ml-6 space-y-3 mb-10 text-white/60" />,
                                ol: ({node, ...props}) => <ol {...props} className="list-decimal list-outside ml-6 space-y-3 mb-10 text-white/60" />,
                                li: ({node, ...props}) => <li {...props} className="marker:text-primary pl-4" />,
                                blockquote: ({node, ...props}) => (
                                    <blockquote {...props} className="border-l-4 border-primary bg-primary/5 p-8 rounded-2xl italic my-12 relative overflow-hidden">
                                        <Zap className="absolute -top-4 -right-4 w-24 h-24 text-primary/[0.03] -rotate-12" />
                                        <div className="relative z-10">{props.children}</div>
                                    </blockquote>
                                )
                            }}
                        >
                            {guide.content}
                        </ReactMarkdown>
                    </div>

                    {/* Author / CTA Footer */}
                    <div className="mt-20 p-10 rounded-[3rem] border border-white/10 bg-dark-surface relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                        <div className="flex flex-col md:flex-row items-center gap-8 justify-between relative z-10">
                            <div className="text-center md:text-left">
                                <h4 className="font-bold text-xl mb-2 italic">A ciência evolui. Não treine no passado.</h4>
                                <p className="text-white/40 text-sm max-w-md">Este conteúdo foi gerado com base em literatura científica de performance feminina. Domine seu ciclo hoje.</p>
                            </div>
                            <a href="https://app.artemisfit.online" className="flex items-center gap-3 px-8 py-4 bg-primary text-dark rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_10px_30px_-5px_rgba(205,255,0,0.4)]">
                                <Zap size={18} /> Ativar IA de Treino
                            </a>
                        </div>
                    </div>
                </motion.div>
            </article>

            {/* SIDEBAR: Newsletter & Recents */}
            <aside className="space-y-12 h-fit lg:sticky lg:top-32">
                
                {/* Mini Newsletter */}
                <div className="p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                            <Gift size={14} /> Hack de Performance
                        </div>
                        <h4 className="text-xl font-bold mb-4 font-display italic leading-tight">Conteúdos que você não lê <span className="text-white not-italic">em nenhum outro lugar</span></h4>
                        
                        {subscribed ? (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4">
                                <CheckCircle2 size={32} className="text-primary mb-4" />
                                <div className="font-bold text-sm">Quase lá! Confira seu e-mail.</div>
                             </motion.div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <input 
                                    type="email" 
                                    placeholder="Seu melhor e-mail"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-white"
                                />
                                <button className="w-full py-3 bg-white text-dark rounded-xl font-bold text-xs hover:bg-primary transition-all flex items-center justify-center gap-2">
                                    Me Inscrever Gratuitamente <ArrowRight size={14} />
                                </button>
                                <p className="text-[9px] text-white/30 text-center uppercase tracking-widest font-bold">1 e-mail por semana. 0 spam.</p>
                            </form>
                        )}
                    </div>
                </div>

                {/* Recent Posts */}
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2 px-2">
                        <Flame size={12} className="text-orange-500" /> Mais do Guia Artemis Fit App
                    </h4>
                    <div className="space-y-6">
                        {recentGuides.map((rg, i) => (
                            <Link key={rg.id} to={`/guia/${rg.slug}`} className="flex items-center gap-4 group">
                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/5">
                                    {rg.image_url ? (
                                        <img src={rg.image_url} alt={rg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/10"><BookOpen size={16} /></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-bold text-sm group-hover:text-primary transition-colors leading-snug line-clamp-2">{rg.title}</h5>
                                    <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold mt-1 block">Lido em 4 min</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Social / Share Sidebar */}
                <div className="pt-8 border-t border-white/5">
                     <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-4">Compartilhe esse conhecimento</p>
                     <div className="flex gap-2">
                        <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-primary transition-all"><Share2 size={16} /></button>
                        <button className="flex-1 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-all">Copiar Link Permanente</button>
                     </div>
                </div>

            </aside>
        </div>
      </main>

      {/* Recommended Footer Section */}
      <section className="bg-dark-surface border-t border-white/5 mt-32 py-24 px-6">
          <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                   <h3 className="text-3xl font-bold font-display italic">Você também pode <span className="text-primary not-italic">gostar de...</span></h3>
                   <Link to="/guia" className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 hover:translate-x-2 transition-transform">
                      Ver biblioteca completa <ArrowRight size={14} />
                   </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentGuides.slice(0, 4).map((rg) => (
                    <Link key={rg.id} to={`/guia/${rg.slug}`} className="group block">
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 border border-white/5 bg-white/5">
                            {rg.image_url && <img src={rg.image_url} alt={rg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                        </div>
                        <h4 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-2 whitespace-normal">{rg.title}</h4>
                    </Link>
                ))}
              </div>
          </div>
      </section>
    </div>
  );
};
