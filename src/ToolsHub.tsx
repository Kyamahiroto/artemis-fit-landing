import React from 'react';
import { ArrowLeft, Zap, Calculator, Activity, Target, Sparkles, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const ToolsHub = () => {
    const tools = [
        {
            id: "ciclo-e-treino",
            title: "Calculadora de Ciclo + Treino",
            desc: "Descubra sua fase atual e saiba exatamente o que esperar do seu desempenho e força nos próximos dias.",
            icon: <Sparkles size={24} />,
            status: "Disponível",
            path: "/ferramentas/ciclo-e-treino",
            priority: true
        },
        {
            id: "gerador-de-treino",
            title: "Gerador Rápido de Treino",
            desc: "Um treino de hipertrofia baseado no seu tempo livre e equipamento. (Inteligência Limitada)",
            icon: <Zap size={24} />,
            status: "Em Breve",
            path: "/ferramentas/gerador-de-treino",
            priority: false
        },
        {
            id: "calculadora-proteina",
            title: "Cotas de Proteína Inteligentes",
            desc: "As calculadoras normais não servem para mulheres. Entenda como dividir sua proteína para otimizar massa magra.",
            icon: <Target size={24} />,
            status: "Em Breve",
            path: "/ferramentas/calculadora-proteina",
            priority: false
        },
        {
            id: "diagnostico-treino",
            title: "Artemis Readiness Test",
            desc: "Faça o teste de 5 minutos e receba uma nota científica sobre seu potencial de evolução muscular hoje.",
            icon: <Activity size={24} />,
            status: "Em Breve",
            path: "/ferramentas/diagnostico-treino",
            priority: false
        }
    ];

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark pb-24">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 md:px-12 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Voltar para Home
                </Link>
                <img src="/logo.png" alt="Artemis Fit Logo" className="h-8 w-auto hidden sm:block" />
                <a href="https://app.artemisfit.online" className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-dark transition-all">
                    Acessar Web App
                </a>
            </nav>

            <section className="pt-32 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <Brain size={14} /> Laboratório Artemis
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold font-display mb-6">
                        Ferramentas de <span className="italic text-primary">Alta Performance</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-lg text-white/50 max-w-2xl mx-auto">
                        Amostras grátis da inteligência artificial do Artemis. Teste seu corpo, faça diagnósticos imediatos e descubra o que está limitando seus resultados.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                        >
                            {tool.status === "Disponível" ? (
                                <Link to={tool.path} className={`block p-8 rounded-[2rem] border transition-all h-full group ${tool.priority ? 'bg-primary/5 border-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(205,255,0,0.15)]' : 'bg-white/5 border-white/10 hover:border-primary/30'}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tool.priority ? 'bg-primary text-dark' : 'bg-white/10 text-white group-hover:bg-primary/20 group-hover:text-primary transition-all'}`}>
                                            {tool.icon}
                                        </div>
                                        {tool.priority && (
                                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                                                Recomendado
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-6">{tool.desc}</p>
                                    <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-2 transition-transform duration-300">
                                        Acessar Ferramenta <ArrowLeft className="rotate-180" size={16} />
                                    </div>
                                </Link>
                            ) : (
                                <div className="block p-8 rounded-[2rem] border bg-white/5 border-white/5 opacity-50 relative overflow-hidden h-full">
                                    <div className="absolute inset-0 bg-dark/40 z-10 flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs shadow-xl">
                                            Em Desenvolvimento
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 text-white/50">
                                            {tool.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-white/50">{tool.title}</h3>
                                    <p className="text-white/30 text-sm leading-relaxed mb-6">{tool.desc}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="p-8 rounded-[2rem] border border-white/10 bg-dark-surface max-w-2xl mx-auto">
                        <h4 className="font-bold text-xl mb-4">Cansada de testar ferramentas avulsas?</h4>
                        <p className="text-white/50 text-sm mb-6">O Artemis Fit Web App integra cálculos de ciclo, treinos dinâmicos e cotas de proteína em uma única inteligência contínua que evolui todos os dias com você.</p>
                        <a href="https://app.artemisfit.online" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-bold rounded-full hover:scale-105 transition-transform">
                            <Zap size={16} /> Conhecer o Ecossistema Completo
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};
