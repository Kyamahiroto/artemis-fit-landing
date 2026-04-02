import React, { useState } from 'react';
import { ArrowLeft, Zap, Activity, AlertTriangle, ChevronRight, CheckCircle2, Brain, XCircle, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

interface Question {
    id: string;
    text: string;
    options: { label: string; score: number }[];
}

const questions: Question[] = [
    {
        id: 'frequency',
        text: 'Quantos dias por semana você treina?',
        options: [
            { label: '1–2 dias', score: 1 },
            { label: '3–4 dias', score: 3 },
            { label: '5–6 dias', score: 4 },
            { label: '7 dias', score: 2 }  // Overtraining risk
        ]
    },
    {
        id: 'progressive',
        text: 'Você evolui as cargas a cada 2–3 semanas?',
        options: [
            { label: 'Nunca pensei nisso', score: 0 },
            { label: 'Às vezes', score: 2 },
            { label: 'Sim, de forma consciente', score: 5 }
        ]
    },
    {
        id: 'sleep',
        text: 'Quantas horas você dorme em média?',
        options: [
            { label: 'Menos de 5h', score: 0 },
            { label: '5–6h', score: 1 },
            { label: '6–7h', score: 3 },
            { label: '7–8h+', score: 5 }
        ]
    },
    {
        id: 'fatigue',
        text: 'Você sente fadiga sistêmica frequente (corpo pesado, indisposição)?',
        options: [
            { label: 'Quase todo dia', score: 0 },
            { label: 'Às vezes', score: 2 },
            { label: 'Raramente', score: 4 },
            { label: 'Nunca', score: 5 }
        ]
    },
    {
        id: 'cycle_aware',
        text: 'Você adapta seu treino de acordo com a fase do seu ciclo menstrual?',
        options: [
            { label: 'O que? Não.', score: 0 },
            { label: 'Já ouvi falar, mas não faço', score: 1 },
            { label: 'Sim, adapto intuitivamente', score: 3 },
            { label: 'Sim, com dados e rastreamento', score: 5 }
        ]
    }
];

export const TrainingDiagnostic = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [step, setStep] = useState<'quiz' | 'loading' | 'result'>('quiz');
    const [score, setScore] = useState(0);
    const [loadingText, setLoadingText] = useState('Coletando respostas...');

    const handleAnswer = (scoreVal: number) => {
        const newAnswers = [...answers, scoreVal];
        setAnswers(newAnswers);

        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            // All answered, process
            setStep('loading');
            const stages = [
                'Calculando taxa de recuperação...',
                'Mapeando risco de overtraining...',
                'Cruzando com perfil hormonal base...',
                'Gerando diagnóstico de potencial...'
            ];
            let idx = 0;
            const interval = setInterval(() => {
                idx++;
                if (idx < stages.length) setLoadingText(stages[idx]);
            }, 800);

            setTimeout(() => {
                clearInterval(interval);
                const total = newAnswers.reduce((a, b) => a + b, 0);
                const maxScore = 24; // Max possible
                const pct = Math.round((total / maxScore) * 100);
                setScore(pct);
                setStep('result');
            }, 3500);
        }
    };

    const getScoreColor = () => {
        if (score >= 75) return 'text-primary';
        if (score >= 50) return 'text-yellow-400';
        if (score >= 25) return 'text-orange-400';
        return 'text-red-500';
    };

    const getScoreLabel = () => {
        if (score >= 75) return 'Alto Potencial';
        if (score >= 50) return 'Potencial Moderado';
        if (score >= 25) return 'Baixo Potencial';
        return 'Crítico';
    };

    const getScoreIcon = () => {
        if (score >= 75) return <CheckCircle2 size={48} />;
        if (score >= 50) return <Minus size={48} />;
        return <XCircle size={48} />;
    };

    const getWeaknesses = () => {
        const weaknesses: string[] = [];
        if (answers[1] !== undefined && answers[1] <= 2) weaknesses.push('Sobrecarga progressiva ausente ou inconsistente.');
        if (answers[2] !== undefined && answers[2] <= 1) weaknesses.push('Sono insuficiente está destruindo sua síntese proteica noturna.');
        if (answers[3] !== undefined && answers[3] <= 2) weaknesses.push('Fadiga sistêmica detectada — seu sistema nervoso pode estar sobrecarregado.');
        if (answers[4] !== undefined && answers[4] <= 1) weaknesses.push('Treino não sincronizado com ciclo menstrual: você está ignorando seu maior diferencial biológico.');
        if (answers[0] !== undefined && answers[0] <= 1) weaknesses.push('Frequência insuficiente para estímulo de hipertrofia consistente.');
        if (answers[0] !== undefined && answers[0] === 2 && questions[0].options[3]?.score === 2) weaknesses.push('Treinar 7 dias é overtraining disfarçado. O músculo cresce no descanso.');
        if (weaknesses.length === 0) weaknesses.push('Seu perfil parece sólido! Mas sem rastreamento contínuo, a estagnação é questão de tempo.');
        return weaknesses;
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark pb-32">
            <SEOHead
                title="Teste de Potencial Muscular Feminino | Artemis Fit"
                description="Faça o teste de 5 perguntas e descubra o que está limitando sua evolução muscular e como corrigir. Diagnóstico gratuito."
            />

            {/* Hero Image Section */}
            <div className="relative h-[40vh] w-full overflow-hidden">
                <img
                    src="/guides/overtraining-sinais.png"
                    alt="Diagnóstico de Treino"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Artemis Readiness Test</h1>
                        <p className="text-white/60 text-lg">Descubra o que está travando sua evolução muscular hoje.</p>
                    </motion.div>
                </div>
            </div>

            <nav className="px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between sticky top-0 z-40">
                <Link to="/guia" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Guia Artemis
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">
                    <Brain size={12} /> Diagnóstico
                </div>
            </nav>

            <main className="max-w-2xl mx-auto pt-16 px-6">
                <AnimatePresence mode="wait">
                    {step === 'quiz' && (
                        <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                            <div className="text-center mb-6">
                                <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">
                                    Artemis <span className="text-primary italic">Readiness Test</span>
                                </h1>
                                <p className="text-white/40 text-sm">Teste de 5 perguntas para diagnóstico rápido de potencial.</p>
                            </div>

                            {/* Progress */}
                            <div className="flex gap-2 mb-10">
                                {questions.map((_, i) => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= currentQ ? 'bg-primary' : 'bg-white/10'}`} />
                                ))}
                            </div>

                            <div className="p-8 rounded-[2rem] bg-dark-surface border border-white/10 shadow-2xl">
                                <div className="text-xs text-white/30 uppercase tracking-widest mb-4 font-bold">Pergunta {currentQ + 1} de {questions.length}</div>
                                <h2 className="text-xl md:text-2xl font-bold mb-8">{questions[currentQ].text}</h2>

                                <div className="space-y-3">
                                    {questions[currentQ].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(opt.score)}
                                            className="w-full text-left p-4 rounded-2xl border bg-white/5 border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all font-medium flex items-center justify-between group"
                                        >
                                            {opt.label}
                                            <ChevronRight size={16} className="text-white/20 group-hover:text-primary transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'loading' && (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 relative mb-8">
                                <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                                <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold font-display">{loadingText}</h2>
                            <p className="text-white/40 mt-4 max-w-sm">Processando seu perfil para diagnóstico de potencial de evolução muscular.</p>
                        </motion.div>
                    )}

                    {step === 'result' && (
                        <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            {/* Score Card */}
                            <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-10 mb-8 shadow-xl text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5"><Activity size={120} /></div>
                                <div className="text-white/50 text-sm mb-3">Seu Potencial de Evolução Muscular</div>
                                <div className={`text-7xl font-display font-bold mb-2 ${getScoreColor()}`}>{score}<span className="text-3xl">/100</span></div>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${getScoreColor()} bg-white/5`}>
                                    {getScoreIcon()} {getScoreLabel()}
                                </div>
                            </div>

                            {/* Weaknesses identified */}
                            <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-8 mb-10 shadow-xl">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-orange-400" /> Pontos Fracos Detectados
                                </h3>
                                <div className="space-y-3">
                                    {getWeaknesses().map((w, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                                            <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                                            <p className="text-sm text-white/80">{w}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="p-8 bg-black border border-white/10 rounded-[2rem] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 bg-primary h-full"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Brain className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Este teste indica falhas. Corrigi-las exige rastreamento.</h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                                            Você viu os gargalos. Mas <b>saber e resolver são coisas diferentes</b>. A Artemis AI monitora sono, fadiga, ciclo e progressão — e corrige a rota do treino em tempo real. Sem planilha. Sem achismo.
                                        </p>
                                        <a href="https://app.artemisfit.online" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-dark rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(205,255,0,0.4)]">
                                            <Zap size={18} /> Ativar monitoramento contínuo com IA
                                        </a>

                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <button onClick={() => { setStep('quiz'); setCurrentQ(0); setAnswers([]); }} className="text-xs font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">
                                                Refazer diagnóstico
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};
