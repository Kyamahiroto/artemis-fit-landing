import React from 'react';
import { ArrowLeft, Brain, Zap, Target, Calendar, Activity, TrendingUp, ShieldCheck, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SEOHead } from './components/SEOHead';



export const Technology = () => {
    const steps = [
        { num: '01', title: 'Você registra seus dados', desc: 'Nível, objetivos, rotina, local de treino e informações sobre seu ciclo.', icon: <Sparkles size={20} className="text-primary" /> },
        { num: '02', title: 'O sistema analisa seu comportamento', desc: 'O Artemis processa seu histórico e identifica padrões de desempenho e evolução.', icon: <Brain size={20} className="text-primary" /> },
        { num: '03', title: 'O treino é criado automaticamente', desc: 'Um plano completo e personalizado é gerado para a sua realidade.', icon: <Zap size={20} className="text-primary" /> },
        { num: '04', title: 'Ajustes com base no seu desempenho', desc: 'Cada sessão registrada alimenta o sistema para calibrar cargas e volume.', icon: <Activity size={20} className="text-primary" /> },
        { num: '05', title: 'Você evolui com direção', desc: 'Progresso consistente e sem achismo — guiado por dados reais.', icon: <TrendingUp size={20} className="text-primary" /> },
    ];

    const anticipations = [
        { icon: <TrendingUp size={22} className="text-primary" />, title: 'Queda de desempenho', desc: 'O Artemis identifica quando seu rendimento cai e ajusta o plano antes que você trave.' },
        { icon: <Calendar size={22} className="text-primary" />, title: 'Falta de consistência', desc: 'O sistema detecta lacunas na rotina e adapta o treino para manter o momentum.' },
        { icon: <Activity size={22} className="text-primary" />, title: 'Necessidade de ajuste', desc: 'Quando seu corpo pede recovery ou intensidade diferente, o Artemis responde primeiro.' },
    ];

    const personalizations = [
        { label: 'Nível', icon: <Target size={16} /> },
        { label: 'Rotina', icon: <Calendar size={16} /> },
        { label: 'Ambiente', icon: <Activity size={16} /> },
        { label: 'Ciclo Menstrual', icon: <Sparkles size={16} /> },
    ];

    const chatMessages = [
        { from: 'user', text: 'Posso treinar pesado hoje? Estou com cansaço.' },
        { from: 'ai', text: 'Baseada no seu ciclo e nos últimos 3 treinos, recomendo intensidade moderada hoje. Foque em técnica e mobilidade — amanhã seu corpo estará mais receptivo.' },
        { from: 'user', text: 'E minha progressão de carga no agachamento?' },
        { from: 'ai', text: 'Você evoluiu 8% nas últimas 2 semanas. Sugiro manter a carga atual por mais 4 sessões antes de aumentar — isso vai consolidar a base e evitar lesão.' },
    ];

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark">
            <SEOHead
                title="Tecnologia Artemis | Inteligência Feminina em Performance"
                description="Entenda como a IA Artemis analisa sua biologia, ciclo menstrual e desempenho para criar o sistema de treino mais avançado para mulheres."
                canonicalUrl="https://artemisfit.online/tecnologia"
            />
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 md:px-12 flex items-center gap-8">
                <a href="/" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Voltar
                </a>
                <img src="/logo.png" alt="Artemis Fit Logo" className="h-10 w-auto" />
            </nav>

            {/* Hero */}
            <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden text-center">
                <div className="absolute top-1/3 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                    <Sparkles size={14} /> Tecnologia Artemis
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-8xl font-bold font-display leading-[0.95] mb-6 tracking-tight max-w-5xl mx-auto">
                    Tecnologia que <span className="text-primary italic">entende</span><br />o seu corpo.
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
                    O Artemis não entrega apenas treinos. Ele analisa, aprende e evolui com você.
                </motion.p>
            </section>

            {/* Como Funciona */}
            <section className="py-24 px-6 bg-dark-surface">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Como Funciona</h2>
                        <h3 className="text-3xl md:text-5xl font-bold font-display">5 etapas que mudam tudo.</h3>
                    </div>
                    <div className="space-y-4">
                        {steps.map((step, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="text-4xl font-bold font-display text-primary/20 group-hover:text-primary/40 transition-colors w-12 flex-shrink-0">{step.num}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">{step.icon}<h4 className="font-bold text-lg">{step.title}</h4></div>
                                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inteligência Adaptativa */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Inteligência Adaptativa</h2>
                        <h3 className="text-3xl md:text-6xl font-bold font-display mb-6">O sistema que se molda<br /><span className="italic text-white/40">à sua evolução.</span></h3>
                        <p className="text-lg text-white/50 max-w-2xl mx-auto">
                            O Artemis identifica padrões, ajusta cargas e adapta seu treino conforme sua evolução — sem que você precise entender tudo tecnicamente.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: <Brain size={28} className="text-primary" />, title: 'Identifica', desc: 'Padrões de comportamento, desempenho e resposta ao treino.' },
                            { icon: <Zap size={28} className="text-primary" />, title: 'Ajusta', desc: 'Carga, volume e intensidade conforme seu nível e progresso real.' },
                            { icon: <Target size={28} className="text-primary" />, title: 'Antecipa', desc: 'Necessidades futuras antes que elas impactem negativamente seu treino.' },
                        ].map((card, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2rem] bg-dark-surface border border-white/5 hover:border-primary/20 transition-all text-center">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">{card.icon}</div>
                                <h4 className="text-2xl font-bold mb-3">{card.title}</h4>
                                <p className="text-white/50 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Personalização Real */}
            <section className="py-24 px-6 bg-dark-surface">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Personalização Real</h2>
                        <h3 className="text-3xl md:text-5xl font-bold font-display mb-6 leading-tight">Seu treino respeita<br /><span className="italic text-white/40">sua realidade.</span></h3>
                        <p className="text-lg text-white/50 mb-8 leading-relaxed">Nada de plano genérico. O Artemis considera a sua situação única e entrega recomendações que se encaixam na sua vida.</p>
                        <p className="text-white/70 italic">"Seu treino respeita sua realidade e seu momento."</p>
                    </div>
                    <div className="space-y-4">
                        {personalizations.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div>
                                <span className="font-bold text-lg">{item.label}</span>
                                <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Antecipação */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Antecipação</h2>
                        <h3 className="text-3xl md:text-6xl font-bold font-display mb-6">O Artemis não apenas<br /><span className="italic text-white/40">acompanha. Ele antecipa.</span></h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {anticipations.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2rem] bg-dark-surface border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Assistente Inteligente */}
            <section className="py-24 px-6 bg-dark-surface">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-4 relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/15 rounded-full blur-[80px]" />
                        {chatMessages.map((msg, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: msg.from === 'user' ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                className={`max-w-sm p-5 rounded-2xl text-sm relative z-10 ${msg.from === 'user' ? 'ml-auto glass rounded-br-none' : 'bg-primary text-dark font-medium rounded-bl-none'}`}>
                                {msg.from === 'ai' && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <Brain size={14} /><span className="text-[10px] font-bold uppercase tracking-wider">Artemis AI</span>
                                    </div>
                                )}
                                {msg.text}
                            </motion.div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Assistente Inteligente</h2>
                        <h3 className="text-3xl md:text-5xl font-bold font-display mb-6 leading-tight">Uma assistente que<br /><span className="italic text-white/40">fala a sua língua.</span></h3>
                        <p className="text-lg text-white/50 leading-relaxed">
                            Não é uma calculadora de macros. É uma assistente que interpreta seus dados, entende seu contexto e orienta suas decisões com base no seu comportamento real.
                        </p>
                    </div>
                </div>
            </section>

            {/* Diferencial Feminino */}
            <section className="py-20 px-6 bg-primary/5 border-y border-primary/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-px bg-primary/40" />
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.25em]">Diferencial Feminino</span>
                        <div className="w-8 h-px bg-primary/40" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold font-display mb-6 leading-tight">
                        O único sistema que <span className="text-primary italic">respeita</span><br />a biologia feminina.
                    </h3>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                        O Artemis considera variações fisiológicas do ciclo menstrual e adapta as recomendações de acordo com o estado real do seu corpo — não com médias masculinas.
                    </p>
                </div>
            </section>

            {/* Final Emotional Block */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-bold font-display leading-[0.95] mb-8 tracking-tight">
                        O Artemis não é um<br /><span className="italic text-white/40">app de treino.</span><br />É um sistema que<br /><span className="text-primary">evolui com você.</span>
                    </motion.h2>
                    <p className="text-lg text-white/40 max-w-xl mx-auto mb-16 leading-relaxed">
                        Tecnologia criada para mulheres que levam a sério a própria evolução.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://app.artemisfit.online" className="w-full sm:w-auto px-10 py-5 bg-primary text-dark rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(205,255,0,0.5)]">
                            <Zap size={22} /> Acessar Artemis
                        </a>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 text-center text-[10px] text-white/20 font-bold uppercase tracking-widest">
                © 2026 Artemis Fit. Todos os direitos reservados.
            </footer>
        </div>
    );
};
