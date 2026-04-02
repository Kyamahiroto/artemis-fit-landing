import React, { useState } from 'react';
import { ArrowLeft, Zap, Dumbbell, Clock, MapPin, Activity, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

type Local = 'Casa' | 'Academia';
type Focus = 'Membros Inferiores' | 'Membros Superiores' | 'Full Body';
type Time = '15-30min' | '30-45min' | '45-60min';

interface Exercise {
    name: string;
    sets: string;
    obs?: string;
}

export const WorkoutGenerator = () => {
    const [local, setLocal] = useState<Local | null>(null);
    const [focus, setFocus] = useState<Focus | null>(null);
    const [time, setTime] = useState<Time | null>(null);

    // States: 'input' | 'loading' | 'result'
    const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
    const [loadingText, setLoadingText] = useState('Analisando perfil fisiológico...');
    const [workout, setWorkout] = useState<Exercise[]>([]);

    const loadingStages = [
        "Mapeando banco de dados de exercícios...",
        "Balanceando volume e intensidade...",
        "Otimizando cadência para hipertrofia...",
        "Gerando estrutura de treino ótimo..."
    ];

    const generateWorkoutDB = (loc: Local, foc: Focus, t: Time): Exercise[] => {
        // Base simplistic logic to generate somewhat realistic workouts to impress the user
        const isHome = loc === 'Casa';
        const isShort = t === '15-30min';

        if (foc === 'Membros Inferiores') {
            if (isHome) {
                return [
                    { name: "Agachamento Livre (Peso Corporal)", sets: "3x 15 a 20 reps", obs: "Foco em contração no glúteo" },
                    { name: "Afundo Búlgaro (Sofá/Cadeira)", sets: "3x 10-12 reps (cada perna)", obs: "Tronco levemente inclinado para frente" },
                    { name: "Elevação Pélvica Unilateral", sets: "3x 15 reps", obs: "Aperte no topo por 2 segundos" },
                    ...(isShort ? [] : [{ name: "Agachamento Sumô c/ Mochila pesada", sets: "3x 12 reps" }])
                ];
            } else {
                return [
                    { name: "Agachamento Livre Barra", sets: "4x 8-10 reps", obs: "Cadência 3:0:1" },
                    { name: "Leg Press 45º", sets: "3x 10-12 reps", obs: "Amplitude máxima segura" },
                    { name: "Elevação Pélvica Máquina", sets: "4x 12 reps", obs: "Pico de contração de 2s" },
                    ...(isShort ? [] : [{ name: "Cadeira Extensora", sets: "3x 15 reps", obs: "Rest-pause na última série" }])
                ];
            }
        } else if (foc === 'Membros Superiores') {
            if (isHome) {
                return [
                    { name: "Flexão de Braço (Apoiada ou chão)", sets: "3x 10-15 reps" },
                    { name: "Remada Invertida (Mesa) ou Remada com Mochila", sets: "3x 12 reps" },
                    { name: "Tríceps no Banco/Sofá", sets: "3x 15 reps" },
                    ...(isShort ? [] : [{ name: "Prancha Isométrica", sets: "3x 40 seg" }])
                ];
            } else {
                return [
                    { name: "Puxada Frontal Aberta", sets: "3x 10-12 reps" },
                    { name: "Desenvolvimento com Halteres", sets: "3x 10 reps" },
                    { name: "Remada Baixa Triângulo", sets: "3x 12 reps" },
                    ...(isShort ? [] : [
                        { name: "Elevação Lateral", sets: "3x 15 reps", obs: "Drop-set na última" },
                        { name: "Tríceps Pulley", sets: "3x 12 reps" }
                    ])
                ];
            }
        } else {
            // Full Body
            if (isHome) {
                return [
                    { name: "Burpees ou Polichinelos", sets: "3x 1 min", obs: "Aquecimento ativo" },
                    { name: "Agachamento c/ Salto", sets: "3x 15 reps" },
                    { name: "Flexão de Braço", sets: "3x Máx reps" },
                    { name: "Passada Estática", sets: "3x 12 cada perna" }
                ];
            } else {
                return [
                    { name: "Agachamento Globet", sets: "3x 12 reps" },
                    { name: "Supino Reto ou Máquina", sets: "3x 10 reps" },
                    { name: "Levantamento Terra Romeno (RDL)", sets: "3x 10 reps" },
                    { name: "Remada Curvada", sets: "3x 12 reps" }
                ];
            }
        }
    };

    const handleGenerate = () => {
        if (!local || !focus || !time) return;

        setStep('loading');

        // Simulate complex AI processing
        let stageIndex = 0;
        const interval = setInterval(() => {
            if (stageIndex < loadingStages.length) {
                setLoadingText(loadingStages[stageIndex]);
                stageIndex++;
            }
        }, 800);

        setTimeout(() => {
            clearInterval(interval);
            const w = generateWorkoutDB(local, focus, time);
            setWorkout(w);
            setStep('result');
        }, 3500);
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark pb-32">
            <nav className="px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
                <Link to="/ferramentas" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Hub de Ferramentas
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">
                    <Zap size={12} /> Alta Conversão
                </div>
            </nav>

            <main className="max-w-2xl mx-auto pt-16 px-6">
                <AnimatePresence mode="wait">
                    {/* INPUT STEP */}
                    {step === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        >
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">
                                    Gerador de <span className="text-primary italic">Treino</span>
                                </h1>
                                <p className="text-white/50">Insira suas limitações momentâneas e receba uma estrutura imediata focada em hipertrofia.</p>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-dark-surface border border-white/10 shadow-2xl space-y-10">
                                {/* Local */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
                                        <MapPin size={16} className="text-primary" /> 1. Onde você vai treinar?
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {(['Casa', 'Academia'] as Local[]).map(o => (
                                            <button
                                                key={o}
                                                onClick={() => setLocal(o)}
                                                className={`p-4 rounded-2xl border transition-all font-bold ${local === o ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'}`}
                                            >
                                                {o}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Focus */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
                                        <Dumbbell size={16} className="text-primary" /> 2. Foco Muscular Prioritário
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {(['Membros Inferiores', 'Membros Superiores', 'Full Body'] as Focus[]).map(o => (
                                            <button
                                                key={o}
                                                onClick={() => setFocus(o)}
                                                className={`p-4 rounded-2xl border transition-all font-bold text-sm ${focus === o ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'}`}
                                            >
                                                {o}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tempo */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
                                        <Clock size={16} className="text-primary" /> 3. Tempo Disponível
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {(['15-30min', '30-45min', '45-60min'] as Time[]).map(o => (
                                            <button
                                                key={o}
                                                onClick={() => setTime(o)}
                                                className={`p-4 rounded-2xl border transition-all font-bold text-sm ${time === o ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'}`}
                                            >
                                                {o}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={!local || !focus || !time}
                                    className="w-full py-5 bg-white text-dark rounded-full font-bold text-lg hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                                >
                                    Gerar Treino Imediato <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* LOADING STEP */}
                    {step === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="w-20 h-20 relative mb-8">
                                <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                                <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary pulse-quick" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold font-display tracking-wide glow-text">{loadingText}</h2>
                            <p className="text-white/40 mt-4 max-w-sm">A Inteligência Artificial base do Artemis está estruturando divisões fisiológicas focadas em hipertrofia feminina.</p>
                        </motion.div>
                    )}

                    {/* RESULT STEP */}
                    {step === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4 bg-primary/10 px-4 py-2 rounded-full">
                                    <CheckCircle2 size={16} /> Seu Treino Genérico está pronto
                                </div>
                            </div>

                            <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-8 mb-10 shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-5"><Dumbbell size={100} /></div>

                                <div className="flex gap-4 mb-8 relative z-10">
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white/50">{local}</div>
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white/50">{focus}</div>
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white/50">{time}</div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    {workout.map((ex, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div>
                                                <div className="font-bold text-lg">{ex.name}</div>
                                                {ex.obs && <div className="text-sm text-primary mt-1">{ex.obs}</div>}
                                            </div>
                                            <div className="mt-3 sm:mt-0 px-4 py-2 bg-dark rounded-xl text-sm font-bold text-white/80 shrink-0 text-center">
                                                {ex.sets}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* TRIGGER INSATISFAÇÃO */}
                            <div className="p-8 bg-black border border-white/10 rounded-[2rem] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 bg-red-500 h-full"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                        <AlertTriangle className="text-red-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Aviso de Performance Oculta</h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                                            Este é um treino de "papel". Ele está estruturalmente lindo, mas foi gerado <b>às cegas</b>. <br /><br />
                                            A Inteligência Artificial não analisou em que fase do <b>Ciclo Menstrual</b> você está (o que define seu poder de carga hoje) e nem analisou a <b>Recuperação Sistêmica</b> dos seus ligamentos. Executar planilhas estáticas leva à estagnação em 3 semanas.
                                        </p>
                                        <a href="https://app.artemisfit.online" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-dark rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(205,255,0,0.4)]">
                                            <Zap size={18} /> Deixar a IA Artemis periodizar e rastrear isso automaticamente
                                        </a>

                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <button onClick={() => setStep('input')} className="text-xs font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">
                                                Gerar novo treino genérico
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
