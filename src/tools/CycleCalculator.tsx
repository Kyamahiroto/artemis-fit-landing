import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Activity, AlertTriangle, Zap, Share2, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

type Phase = 'Menstrual' | 'Folicular' | 'Ovulatória' | 'Lútea' | null;

export const CycleCalculator = () => {
    const [cycleLength, setCycleLength] = useState<number>(28);
    const [lastPeriod, setLastPeriod] = useState<string>('');
    const [resultPhase, setResultPhase] = useState<Phase>(null);
    const [currentDay, setCurrentDay] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const calculatePhase = (e: React.FormEvent) => {
        e.preventDefault();
        if (!lastPeriod) return;

        setLoading(true);
        setTimeout(() => {
            const today = new Date();
            const lastDate = new Date(lastPeriod);
            const diffTime = Math.abs(today.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const currentCycleDay = (diffDays % cycleLength) + 1;
            setCurrentDay(currentCycleDay);

            if (currentCycleDay >= 1 && currentCycleDay <= 5) setResultPhase('Menstrual');
            else if (currentCycleDay >= 6 && currentCycleDay <= 13) setResultPhase('Folicular');
            else if (currentCycleDay >= 14 && currentCycleDay <= 16) setResultPhase('Ovulatória');
            else setResultPhase('Lútea');

            setLoading(false);
        }, 800);
    };

    const phaseData = {
        Menstrual: {
            alert: "Seu corpo está em alto esforço inflamatório.",
            impact: "Força cai até 15%. Risco maior de fadiga sistêmica rápida.",
            action: "Mantenha a carga mas reduza o volume de séries. Não vá até a falha real hoje.",
            color: "text-red-400 font-bold",
            bg: "bg-red-400/10 border-red-400/30"
        },
        Folicular: {
            alert: "Níveis subindo: Você está entrando no seu pico de performance.",
            impact: "Alta tolerância à dor e recuperação muscular otimizada.",
            action: "É o momento ideal para buscar PR (Recordes Pessoais) e aumentar volume.",
            color: "text-primary font-bold",
            bg: "bg-primary/10 border-primary/30"
        },
        Ovulatória: {
            alert: "Pico de Estrogênio: Força extrema, mas atenção aos ligamentos.",
            impact: "Força máxima ativada, porém frouxidão ligamentar pode trazer risco de lesão no joelho.",
            action: "Treine pesado, mas faça aquecimento articular dobrado. Cuidado extra no Agachamento.",
            color: "text-orange-400 font-bold",
            bg: "bg-orange-400/10 border-orange-400/30"
        },
        Lútea: {
            alert: "Queda hormonal + Temperatura basal alta.",
            impact: "Queima calórica basal aumenta de 100 a 300 kcal/dia. Mas a força muscular tem leve queda e retenção de líquido sobe.",
            action: "Abaixe um pouco as cargas, mantenha bom tempo de tensão (hipertrofia focada). Fome é normal, não restrinja radicalmente.",
            color: "text-yellow-400 font-bold",
            bg: "bg-yellow-400/10 border-yellow-400/30"
        }
    };

    const handleShare = () => {
        const text = `Meu Perfil Artemis: Hoje estou no Dia ${currentDay} do biológico (Fase ${resultPhase}). O que significa: ${resultPhase ? phaseData[resultPhase].impact : ''} Descubra o seu na Calculadora Artemis!`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark">
            <SEOHead
                title="Calculadora de Ciclo Menstrual e Treino | Artemis Fit"
                description="Descubra em que fase do ciclo você está e como isso afeta sua força, recuperação e desempenho no treino. Ferramenta gratuita."
            />

            <nav className="px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between sticky top-0 z-40">
                <Link to="/guia" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Guia Artemis
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">
                    <Sparkles size={12} /> Beta
                </div>
            </nav>

            <main className="max-w-2xl mx-auto pt-16 pb-32 px-6">
                {!resultPhase ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">Calculadora de <br /><span className="text-primary italic">Ciclo + Treino</span></h1>
                            <p className="text-white/50">Não treine às cegas. Insira seus dados e entenda o que seu sistema biológico está ditando para sua performance hoje.</p>
                        </div>

                        <form onSubmit={calculatePhase} className="p-8 rounded-[2rem] bg-dark-surface border border-white/10 shadow-2xl">
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-sm font-bold text-white/70 mb-2">Quantos dias costuma durar seu ciclo?</label>
                                    <input
                                        type="number"
                                        min="20" max="45"
                                        value={cycleLength}
                                        onChange={(e) => setCycleLength(Number(e.target.value))}
                                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary text-xl font-medium transition-colors"
                                        required
                                    />
                                    <div className="text-[10px] text-white/30 mt-2 uppercase tracking-wide">Média normal é 28 dias</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white/70 mb-2">Primeiro dia da sua ÚLTIMA menstruação:</label>
                                    <input
                                        type="date"
                                        value={lastPeriod}
                                        onChange={(e) => setLastPeriod(e.target.value)}
                                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary text-xl font-medium transition-colors [color-scheme:dark]"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !lastPeriod}
                                    className="w-full py-5 bg-white text-dark rounded-full font-bold text-lg hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Calculando biorritmo...' : <><Activity size={20} /> Mapear Força e Desempenho</>}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>

                            {/* Resultado Visual e Compartilhável */}
                            <div className="bg-dark-surface p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-xl relative overflow-hidden mb-8" id="shareable-result">
                                <div className="absolute top-0 right-0 p-6 opacity-5">
                                    <Sparkles size={120} />
                                </div>
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Activity size={16} className="text-primary" /></div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Perfil Biológico Artemis</span>
                                </div>

                                <div className="mb-2 text-white/50 font-medium">Hoje você está no <span className="text-white font-bold">Dia {currentDay}</span> do seu ciclo.</div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                                    Fase <span className={phaseData[resultPhase].color}>{resultPhase}</span>
                                </h2>

                                <div className={`p-4 rounded-2xl border ${phaseData[resultPhase].bg} mb-8`}>
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle size={20} className={`mt-0.5 ${phaseData[resultPhase].color}`} />
                                        <div>
                                            <div className={`font-bold mb-1 ${phaseData[resultPhase].color}`}>{phaseData[resultPhase].alert}</div>
                                            <p className="text-sm opacity-90">{phaseData[resultPhase].impact}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3 border-b border-white/10 pb-2">Como você deve treinar hoje</div>
                                    <p className="text-lg leading-relaxed">{phaseData[resultPhase].action}</p>
                                </div>
                            </div>

                            {/* Share button */}
                            <div className="flex justify-center mb-16">
                                <button onClick={handleShare} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold">
                                    {copied ? <><ClipboardCheck size={16} className="text-primary" /> Copiado para você colar!</> : <><Share2 size={16} /> Copiar meu Resumo Biológico</>}
                                </button>
                            </div>

                            {/* Insatisfação & CTA Block */}
                            <div className="text-center p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem]">
                                <h3 className="text-2xl font-bold mb-4 font-display">Isso é só a ponta do iceberg.</h3>
                                <p className="text-white/60 mb-8 max-w-md mx-auto">Você acabou de descobrir o direcionamento isolado de <span className="text-white font-bold underline decoration-primary">hoje</span>. Mas você tem segurança para calcular e ajustar os volumes, cargas e técnicas para a semana inteira sozinha?</p>

                                <a href="https://app.artemisfit.online" className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-5 bg-primary text-dark font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_-5px_rgba(205,255,0,0.5)]">
                                    <Zap size={20} /> Deixar a IA adaptar automaticamente
                                </a>

                                <div className="mt-8 pt-6 border-t border-primary/10">
                                    <button onClick={() => setResultPhase(null)} className="text-sm text-white/40 hover:text-white transition-colors underline underline-offset-4">Recalcular nova data</button>
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                )}
            </main>
        </div>
    );
};
