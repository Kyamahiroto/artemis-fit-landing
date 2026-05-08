import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { 
  Zap, ArrowRight, BookOpen, Calculator, Brain, 
  Sparkles, Flame, Clock, Mail, CheckCircle2, 
  Search, Filter, ChevronRight, Layout, Dumbbell, 
  Utensils, Moon, RefreshCw, Layers
} from 'lucide-react';
import { SEOHead } from './components/SEOHead';
import { motion, AnimatePresence } from 'motion/react';

interface Guide {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  image_url?: string;
  created_at: string;
  category?: string;
}

const CATEGORIES = [
  { id: 'all', label: 'Tudo', icon: <Layers size={16} /> },
  { id: 'treino', label: 'Criar Treinos', icon: <Dumbbell size={16} /> },
  { id: 'ciclo', label: 'Ciclo Menstrual', icon: <RefreshCw size={16} /> },
  { id: 'nutricao', label: 'Nutrição & Dieta', icon: <Utensils size={16} /> },
  { id: 'saude', label: 'Saúde & Hormônios', icon: <Brain size={16} /> },
  { id: 'recuperacao', label: 'Sono & Recuperação', icon: <Moon size={16} /> },
];

export const ToolsHub = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const tools = [
    {
      title: "Gerador de Treino IA",
      desc: "Monte sua rotina completa baseada no seu nível e fase do ciclo.",
      icon: <Zap className="text-primary" />,
      link: "/guia/gerador-de-treino",
      category: "treino",
      badge: "Popular"
    },
    {
      title: "Bio-Calculadora de Proteína",
      desc: "Quanto você realmente precisa comer para ganhar massa magra?",
      icon: <Calculator className="text-primary" />,
      link: "/guia/calculadora-proteina",
      category: "nutricao",
      badge: "Essencial"
    },
    {
      title: "Monitor de Ciclo & Treino",
      desc: "Descubra em qual fase você está e como treinar hoje.",
      icon: <RefreshCw className="text-primary" />,
      link: "/guia/ciclo-e-treino",
      category: "ciclo",
      badge: "Bio-Hack"
    },
    {
      title: "Diagnóstico de Performance",
      desc: "Identifique os gargalos que estão travando seus resultados.",
      icon: <Brain className="text-primary" />,
      link: "/guia/diagnostico-treino",
      category: "saude",
      badge: "Deep"
    }
  ];

  useEffect(() => {
    const fetchGuides = async () => {
      const { data, error } = await supabase
        .from('guides')
        .select('id, title, subtitle, slug, image_url, created_at, category')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setGuides(data);
        setFilteredGuides(data);
      }
      setLoading(false);
    };
    fetchGuides();
  }, []);

  useEffect(() => {
    let result = guides;
    
    // Helper to remove accents/diacritics for better comparison
    const normalize = (str: string) => 
      str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Filter by Search
    if (search) {
      const term = normalize(search);
      result = result.filter(g => 
        normalize(g.title).includes(term) || 
        normalize(g.subtitle || '').includes(term)
      );
    }
    
    // Filter by Category
    if (activeCategory !== 'all') {
      const activeId = activeCategory.toLowerCase();
      result = result.filter(g => {
         const cat = (g.category || '').toLowerCase();
         const title = normalize(g.title);
         
         // Direct match or partial match in category field
         if (cat.includes(activeId) || activeId.includes(cat)) return true;

         // Mapping-based match for consistency with Admin categories
         if (activeId === 'treino' && cat.includes('força')) return true;
         if (activeId === 'nutricao' && (cat.includes('proteína') || cat.includes('dieta'))) return true;
         if (activeId === 'saude' && cat.includes('hormonal')) return true;
         if (activeId === 'recuperacao' && (cat.includes('sono') || cat.includes('mentalidade'))) return true;
         if (activeId === 'ciclo' && (cat.includes('menstrual'))) return true;
         
         // Heuristics if no category is set
         if (!g.category) {
            if (activeId === 'treino' && title.includes('treino')) return true;
            if (activeId === 'ciclo' && (title.includes('ciclo') || title.includes('fase') || title.includes('menstrual'))) return true;
            if (activeId === 'nutricao' && (title.includes('proteina') || title.includes('nutricao') || title.includes('comer'))) return true;
            if (activeId === 'recuperacao' && (title.includes('sono') || title.includes('descanso') || title.includes('mentalidade'))) return true;
            if (activeId === 'saude' && (title.includes('hormonio') || title.includes('saude') || title.includes('corpo'))) return true;
         }
         
         return false;
      });
    }
    
    setFilteredGuides(result);
  }, [search, activeCategory, guides]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark text-white font-sans pb-20">
      <SEOHead
        title="Guia Artemis Fit App — Treino Feminino, Ciclo Menstrual e Nutrição"
        description="Ferramentas gratuitas e artigos científicos sobre treino feminino, ciclo menstrual e nutrição. Feito para mulheres que treinam com inteligência."
        canonicalUrl="https://artemisfit.online/guia"
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between md:px-12">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Artemis Fit App Logo" className="h-6 md:h-8 group-hover:scale-105 transition-transform" />
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-white/40">
           <Link to="/" className="hover:text-primary transition-colors">Home</Link>
           <Link to="/guia" className="text-primary">Ferramentas</Link>
        </div>
        <a href="https://app.artemisfit.online" className="px-6 py-2.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-dark transition-all">
          Entrar no App
        </a>
      </nav>

      <main className="pt-32 px-6 max-w-7xl mx-auto">
        
        {/* TOP SEARCH & TOOLS INTRO */}
        <div className="mb-20 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                    <Sparkles size={12} /> Ecossistema Artemis Fit App
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-display mb-8 max-w-2xl mx-auto leading-tight italic">
                    Onde a ciência encontra o seu <span className="text-primary not-italic">bio-hack</span>
                </h1>
                
                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-primary transition-colors">
                        <Search size={20} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Busque por 'fase lútea', 'proteína', 'treino'..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-primary/50 transition-all shadow-2xl focus:bg-white/[0.05]"
                    />
                </div>
            </motion.div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            
            {/* SIDEBAR FILTERS (Qual é a sua dúvida?) */}
            <aside className="hidden lg:block">
                <div className="sticky top-32 space-y-10">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-8 flex items-center gap-2 px-2">
                           Qual é a sua dúvida?
                        </h3>
                        <div className="space-y-1">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all group ${
                                        activeCategory === cat.id 
                                        ? 'bg-primary text-dark shadow-[0_10px_25px_-5px_rgba(205,255,0,0.3)]' 
                                        : 'text-white/40 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={activeCategory === cat.id ? 'text-dark' : 'text-primary'}>{cat.icon}</span>
                                        {cat.label}
                                    </div>
                                    <ChevronRight size={14} className={activeCategory === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all'} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Newsletter */}
                    <div className="p-8 rounded-[2rem] border border-primary/20 bg-primary/5 relative overflow-hidden">
                        <Flame className="absolute -bottom-6 -right-6 w-32 h-32 text-primary/[0.03] -rotate-12" />
                        <h4 className="text-sm font-bold mb-4 italic leading-tight">Receba hacks semanais <span className="text-white">no seu e-mail</span></h4>
                        <form onSubmit={handleSubscribe} className="space-y-3 relative z-10">
                            <input 
                                type="email" 
                                placeholder="E-mail principal"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-white"
                            />
                            <button className="w-full py-3 bg-white text-dark rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all">
                                Inscrever Grátis
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* MOBILE CATEGORY SCROLL */}
            <div className="lg:hidden mb-12 -mx-6 px-6 overflow-x-auto flex gap-3 no-scrollbar pb-4 sticky top-[71px] bg-dark/80 backdrop-blur-xl z-40 py-4 border-b border-white/5">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-bold transition-all border shrink-0 ${
                            activeCategory === cat.id 
                            ? 'bg-primary text-dark border-primary' 
                            : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* CONTENT AREA */}
            <div className="space-y-24">
                
                {/* 1. INTERACTIVE TOOLS */}
                <section>
                    <div className="flex items-end justify-between mb-8 px-2">
                        <div>
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-2">
                                <Zap size={12} /> Ferramentas de Performance
                            </h2>
                            <h3 className="text-3xl font-bold font-display italic">IA & Dados Científicos</h3>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredTools.map((tool, index) => (
                            <Link 
                                key={index} 
                                to={tool.link}
                                className="group p-8 rounded-[2.5rem] bg-dark-surface border border-white/5 hover:border-primary/20 transition-all relative overflow-hidden flex flex-col justify-between"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    {React.cloneElement(tool.icon as any, { size: 100 })}
                                </div>
                                
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            {tool.icon}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 border border-primary/20 px-3 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            {tool.badge}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors">{tool.title}</h4>
                                    <p className="text-white/40 text-sm leading-relaxed mb-8">{tool.desc}</p>
                                </div>
                                
                                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                    Acessar agora <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                        {filteredTools.length === 0 && (
                             <div className="md:col-span-2 py-10 text-center text-white/20 text-sm italic">
                                Nenhuma ferramenta nesta categoria ainda.
                             </div>
                        )}
                    </div>
                </section>

                {/* 2. DYNAMIC GUIDES */}
                <section>
                    <div className="flex items-end justify-between mb-10 px-2">
                        <div>
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 flex items-center gap-2">
                                <BookOpen size={12} /> Guia Artemis Fit App
                            </h2>
                            <h3 className="text-3xl font-bold font-display italic">Biblioteca de Bio-Hacks</h3>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        {loading ? (
                             [...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-[4/3] rounded-[2.5rem] bg-white/5 animate-pulse" />
                             ))
                        ) : filteredGuides.length > 0 ? (
                            filteredGuides.map((guide) => (
                                <Link 
                                    key={guide.id} 
                                    to={`/guia/${guide.slug}`} 
                                    className="group flex flex-col"
                                >
                                    <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 border border-white/5 relative bg-white/5">
                                        {guide.image_url ? (
                                            <img 
                                                src={guide.image_url} 
                                                alt={guide.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-10">
                                                <BookOpen size={48} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-6 left-6 px-4 py-1 bg-primary text-dark rounded-full text-[10px] font-bold uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            Ler Artigo
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2 italic">
                                        {guide.title}
                                    </h4>
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                                        <span className="flex items-center gap-1.5"><Clock size={12} /> 4-6 min</span>
                                        <span className="flex items-center gap-1.5"><Flame size={12} className="text-orange-500" /> Especialista</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="sm:col-span-2 py-20 text-center rounded-[3rem] border border-white/5 border-dashed">
                                <Search size={48} className="mx-auto mb-4 text-white/10" />
                                <h4 className="font-bold text-white/40 mb-2">Sem resultados encontrados</h4>
                                <p className="text-white/20 text-sm">Tente outros termos ou limpe o filtro.</p>
                                <button onClick={() => {setSearch(''); setActiveCategory('all');}} className="mt-6 text-primary font-bold text-xs uppercase tracking-widest hover:underline">Limpar Filtros</button>
                            </div>
                        )}
                    </div>
                </section>

                {/* NEWSLETTER BANNER (If not subscribed) */}
                {!subscribed && (
                    <section className="bg-primary p-12 md:p-20 rounded-[3.5rem] relative overflow-hidden group">
                        <Sparkles className="absolute top-10 right-10 text-dark/10 w-40 h-40 -rotate-12 group-hover:rotate-12 transition-transform duration-1000" />
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold font-display text-dark mb-6 leading-tight italic">
                                Junte-se a <span className="italic">12.000+</span> mulheres otimizando o corpo
                            </h2>
                            <p className="text-dark/70 text-lg mb-10 font-bold max-w-md">
                                Receba um e-mail semanal com novos estudos, bio-hacks e ferramentas de IA.
                            </p>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                                <input 
                                    type="email" 
                                    placeholder="Qual seu melhor e-mail?"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="flex-1 bg-white border-2 border-dark/5 rounded-2xl px-6 py-5 text-dark focus:outline-none focus:border-dark/20 transition-all font-bold placeholder:text-dark/30"
                                />
                                <button className="px-10 py-5 bg-dark text-white rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-2xl">
                                    Inscrever Grátis <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>
                    </section>
                )}

            </div>
        </div>
      </main>

      {/* Footer simplistic to match hub feel */}
      <footer className="mt-32 py-20 px-6 border-t border-white/5 text-center">
            <img src="/logo.png" alt="Artemis Fit App Logo" className="h-6 opacity-20 mx-auto mb-8" />
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-6">Ciência Feminina & Performance</p>
            <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                <Link to="/" className="hover:text-primary">Home</Link>
                <Link to="/privacidade" className="hover:text-primary">Privacidade</Link>
                <Link to="/termos" className="hover:text-primary">Termos</Link>
            </div>
      </footer>
    </div>
  );
};
