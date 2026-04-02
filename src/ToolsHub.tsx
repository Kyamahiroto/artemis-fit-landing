import React from 'react';
import { ArrowLeft, Zap, Activity, Target, Sparkles, Brain, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { guideTips } from './data/guideTipsData';
import { SEOHead } from './components/SEOHead';

export const ToolsHub = () => {
    const tools = [
        {
            id: "ciclo-e-treino",
            title: "Calculadora de Ciclo + Treino",
            desc: "Descubra sua fase hormonal atual e como ela impacta sua força, recuperação e desempenho muscular hoje.",
            icon: <Sparkles size={24} />,
            path: "/guia/ciclo-e-treino",
            priority: true,
            tag: "Mais Usada"
        },
        {
            id: "gerador-de-treino",
            title: "Gerador de Treino Rápido",
            desc: "Monte um treino de hipertrofia em segundos com base no seu tempo, local e foco muscular.",
            icon: <Zap size={24} />,
            path: "/guia/gerador-de-treino",
            priority: false,
            tag: null
        },
        {
            id: "calculadora-proteina",
            title: "Cotas de Proteína Inteligentes",
            desc: "Calcule sua distribuição ideal de proteína por refeição respeitando a janela anabólica feminina.",
            icon: <Target size={24} />,
            path: "/guia/calculadora-proteina",
            priority: false,
            tag: null
        },
        {
            id: "diagnostico-treino",
            title: "Artemis Readiness Test",
            desc: "Responda 5 perguntas e receba uma nota sobre seu potencial de evolução muscular e pontos fracos.",
            icon: <Activity size={24} />,
            path: "/guia/diagnostico-treino",
            priority: false,
            tag: null
        }
    ];

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark pb-24">
            <SEOHead
                title="Guia Artemis | Ferramentas e Dicas de Treino para Mulheres"
                description="Calculadoras, geradores de treino e dicas científicas para otimizar sua performance feminina com base no ciclo menstrual. Ferramentas gratuitas do Artemis Fit."
            />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 md:px-12 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Home
                </Link>
                <img src="/logo.png" alt="Artemis Fit Logo" className="h-8 w-auto hidden sm:block" />
                <a href="https://app.artemisfit.online" className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-dark transition-all">
                    Acessar Web App
                </a>
            </nav>

            <section className="pt-32 px-6 max-w-5xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <Brain size={14} /> Guia Artemis
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold font-display mb-6">
                        Seu centro de <span className="italic text-primary">inteligência feminina</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-lg text-white/50 max-w-2xl mx-auto">
                        Ferramentas interativas e dicas científicas para treinar, comer e evoluir respeitando a biologia que nenhuma planilha genérica entende.
                    </motion.p>
                </div>

                {/* SEÇÃO 1: Ferramentas */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Sparkles size={18} className="text-primary" /></div>
                        Ferramentas Interativas
                    </h2>
                    <p className="text-white/40 text-sm mb-8 ml-[52px]">Calculadoras e geradores que entregam resultados imediatos sobre o seu corpo.</p>

                    <div className="grid md:grid-cols-2 gap-5">
                        {tools.map((tool, i) => (
                            <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                                <Link to={tool.path} className={`block p-7 rounded-[1.5rem] border transition-all h-full group ${tool.priority ? 'bg-primary/5 border-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(205,255,0,0.15)]' : 'bg-white/[0.03] border-white/10 hover:border-primary/30'}`}>
                                    <div className="flex justify-between items-start mb-5">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.priority ? 'bg-primary text-dark' : 'bg-white/10 text-white group-hover:bg-primary/20 group-hover:text-primary transition-all'}`}>
                                            {tool.icon}
                                        </div>
                                        {tool.tag && (
                                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                                                {tool.tag}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-5">{tool.desc}</p>
                                    <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-2 transition-transform duration-300">
                                        Usar Agora <ChevronRight size={16} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* SEÇÃO 2: Dicas Programáticas */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><BookOpen size={18} className="text-white/60" /></div>
                        Dicas Baseadas em Ciência
                    </h2>
                    <p className="text-white/40 text-sm mb-8 ml-[52px]">Respostas diretas e científicas para dúvidas específicas sobre treino e ciclo feminino.</p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {guideTips.map((tip, i) => (
                            <motion.div key={tip.slug} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
                                <Link to={`/guia/dicas/${tip.slug}`} className="block p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-primary/20 transition-all group h-full">
                                    <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-snug">{tip.title}</h3>
                                    <p className="text-white/30 text-xs leading-relaxed mb-3 line-clamp-2">{tip.subtitle}</p>
                                    <span className="text-primary text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Ler <ChevronRight size={12} />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Final */}
                <div className="text-center">
                    <div className="p-8 rounded-[2rem] border border-white/10 bg-dark-surface max-w-2xl mx-auto">
                        <h3 className="font-bold text-xl mb-4">Quer que tudo isso funcione junto, automaticamente?</h3>
                        <p className="text-white/50 text-sm mb-6">O Artemis Fit Web App integra ciclo, treinos adaptativos, cotas de proteína e diagnósticos em uma única inteligência que evolui com você todos os dias.</p>
                        <a href="https://app.artemisfit.online" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-bold rounded-full hover:scale-105 transition-transform">
                            <Zap size={16} /> Conhecer o Artemis Fit
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};
