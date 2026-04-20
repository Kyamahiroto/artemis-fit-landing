import React, { useState } from 'react';
import { ArrowLeft, Zap, Dumbbell, Clock, MapPin, Activity, CheckCircle2, ChevronRight, AlertTriangle, Flame, Timer, BarChart3, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { EmailGate } from '../components/EmailGate';

type Local = 'Casa' | 'Academia';
type Focus = 'Membros Inferiores' | 'Membros Superiores' | 'Full Body';
type Time = '15-30min' | '30-45min' | '45-60min';
type Level = 'Iniciante' | 'Intermediário' | 'Avançado';

interface Exercise {
    name: string;
    sets: string;
    obs?: string;
    intensity: 'leve' | 'moderado' | 'intenso';
    rest: string;
}

interface WarmUp {
    name: string;
    duration: string;
}

const intensityColors: Record<string, string> = {
    leve: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/20',
    moderado: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20',
    intenso: 'bg-red-400/20 text-red-400 border-red-400/20',
};

export const WorkoutGenerator = () => {
    const [local, setLocal] = useState<Local | null>(null);
    const [focus, setFocus] = useState<Focus | null>(null);
    const [time, setTime] = useState<Time | null>(null);
    const [level, setLevel] = useState<Level | null>(null);

    const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
    const [loadingText, setLoadingText] = useState('Analisando perfil fisiológico...');
    const [workout, setWorkout] = useState<Exercise[]>([]);
    const [warmUp, setWarmUp] = useState<WarmUp[]>([]);
    const [coolDown, setCoolDown] = useState<WarmUp[]>([]);
    const [estimatedCalories, setEstimatedCalories] = useState(0);

    const loadingStages = [
        "Mapeando banco de dados de exercícios...",
        "Ajustando para nível de experiência...",
        "Balanceando volume e intensidade...",
        "Otimizando cadência para hipertrofia...",
        "Gerando estrutura de treino ótimo..."
    ];

    const generateWarmUp = (foc: Focus): WarmUp[] => {
        const base: WarmUp[] = [
            { name: 'Polichinelos ou pular corda leve', duration: '2 min' },
        ];
        if (foc === 'Membros Inferiores') {
            base.push({ name: 'Mobilidade de quadril (90/90)', duration: '1 min' });
            base.push({ name: 'Ponte de glúteo (ativação)', duration: '2x12 reps' });
            base.push({ name: 'Agachamento livre sem peso', duration: '1x15 reps' });
        } else if (foc === 'Membros Superiores') {
            base.push({ name: 'Rotação de ombros', duration: '1 min' });
            base.push({ name: 'Band pull-apart ou retração escapular', duration: '2x15 reps' });
            base.push({ name: 'Flexão apoiada (ativação)', duration: '1x10 reps' });
        } else {
            base.push({ name: 'Mobilidade geral (ombro + quadril)', duration: '2 min' });
            base.push({ name: 'Inchworm / prancha ativa', duration: '1x8 reps' });
        }
        return base;
    };

    const generateCoolDown = (): WarmUp[] => [
        { name: 'Alongamento estático dos músculos trabalhados', duration: '3 min' },
        { name: 'Respiração diafragmática (relaxamento)', duration: '1 min' },
        { name: 'Rolar com foam roller (se disponível)', duration: '2 min' },
    ];

    const generateWorkoutDB = (loc: Local, foc: Focus, t: Time, lvl: Level): Exercise[] => {
        const isHome = loc === 'Casa';
        const isShort = t === '15-30min';
        const isAdvanced = lvl === 'Avançado';
        const isBeginner = lvl === 'Iniciante';

        const adjustSets = (base: string): string => {
            if (isBeginner) return base.replace(/[4-5]x/g, '3x').replace(/3x/g, '2x');
            if (isAdvanced) return base.replace(/3x/g, '4x');
            return base;
        };

        if (foc === 'Membros Inferiores') {
            if (isHome) {
                return [
                    { name: "Agachamento Livre (Peso Corporal)", sets: adjustSets("3x 15-20 reps"), obs: "Foco em contração no glúteo", intensity: 'moderado', rest: isBeginner ? '90s' : '60s' },
                    { name: "Afundo Búlgaro (Sofá/Cadeira)", sets: adjustSets("3x 10-12 reps (cada)"), obs: "Tronco levemente inclinado para frente", intensity: 'intenso', rest: '90s' },
                    { name: "Elevação Pélvica Unilateral", sets: adjustSets("3x 15 reps"), obs: "Aperte no topo por 2 segundos", intensity: 'moderado', rest: '60s' },
                    ...(isShort ? [] : [
                        { name: "Agachamento Sumô c/ Mochila pesada", sets: adjustSets("3x 12 reps"), intensity: 'intenso' as const, rest: '75s' },
                        ...(isAdvanced ? [{ name: "Pistol Squat assistido", sets: "2x 6-8 reps (cada)", obs: "Use apoio se necessário", intensity: 'intenso' as const, rest: '120s' }] : []),
                    ]),
                ];
            } else {
                return [
                    { name: "Agachamento Livre Barra", sets: adjustSets("4x 8-10 reps"), obs: `Cadência ${isBeginner ? '2:0:1' : '3:0:1'}`, intensity: 'intenso', rest: isBeginner ? '120s' : '90s' },
                    { name: "Leg Press 45º", sets: adjustSets("3x 10-12 reps"), obs: "Amplitude máxima segura", intensity: 'intenso', rest: '90s' },
                    { name: "Elevação Pélvica Máquina", sets: adjustSets("4x 12 reps"), obs: "Pico de contração de 2s", intensity: 'moderado', rest: '75s' },
                    ...(isShort ? [] : [
                        { name: "Cadeira Extensora", sets: adjustSets("3x 15 reps"), obs: isAdvanced ? "Rest-pause + drop-set na última" : "Rest-pause na última série", intensity: 'moderado' as const, rest: '60s' },
                        { name: "Stiff com Halteres", sets: adjustSets("3x 10 reps"), obs: "Foco em posterior de coxa", intensity: 'intenso' as const, rest: '90s' },
                    ]),
                ];
            }
        } else if (foc === 'Membros Superiores') {
            if (isHome) {
                return [
                    { name: isBeginner ? "Flexão Apoiada no Joelho" : "Flexão de Braço (Chão)", sets: adjustSets("3x 10-15 reps"), intensity: 'moderado', rest: '60s' },
                    { name: "Remada com Mochila Pesada ou Galão", sets: adjustSets("3x 12 reps"), obs: "Postura ereta, puxe o cotovelo para trás", intensity: 'moderado', rest: '60s' },
                    { name: "Tríceps no Banco/Sofá", sets: adjustSets("3x 15 reps"), intensity: 'leve', rest: '45s' },
                    ...(isShort ? [] : [
                        { name: "Prancha Isométrica", sets: adjustSets("3x 40 seg"), intensity: 'moderado' as const, rest: '45s' },
                        ...(isAdvanced ? [{ name: "Pike Push-up (foco ombro)", sets: "3x 8-10 reps", intensity: 'intenso' as const, rest: '75s' }] : []),
                    ]),
                ];
            } else {
                return [
                    { name: "Puxada Frontal Aberta", sets: adjustSets("3x 10-12 reps"), intensity: 'moderado', rest: '75s' },
                    { name: "Desenvolvimento com Halteres", sets: adjustSets("3x 10 reps"), intensity: 'intenso', rest: '90s' },
                    { name: "Remada Baixa Triângulo", sets: adjustSets("3x 12 reps"), intensity: 'moderado', rest: '75s' },
                    ...(isShort ? [] : [
                        { name: "Elevação Lateral", sets: adjustSets("3x 15 reps"), obs: isAdvanced ? "Drop-set + reps parciais na última" : "Drop-set na última", intensity: 'leve' as const, rest: '45s' },
                        { name: "Tríceps Pulley", sets: adjustSets("3x 12 reps"), intensity: 'leve' as const, rest: '45s' },
                    ]),
                ];
            }
        } else {
            if (isHome) {
                return [
                    { name: isBeginner ? "Polichinelos" : "Burpees", sets: adjustSets("3x 1 min"), obs: "Aquecimento ativo", intensity: 'moderado', rest: '45s' },
                    { name: "Agachamento c/ Salto", sets: adjustSets("3x 15 reps"), intensity: 'intenso', rest: '60s' },
                    { name: isBeginner ? "Flexão Apoiada" : "Flexão de Braço", sets: adjustSets("3x Máx reps"), intensity: 'moderado', rest: '60s' },
                    { name: "Passada Estática", sets: adjustSets("3x 12 cada perna"), intensity: 'moderado', rest: '60s' },
                ];
            } else {
                return [
                    { name: "Agachamento Goblet", sets: adjustSets("3x 12 reps"), intensity: 'moderado', rest: '75s' },
                    { name: "Supino Reto ou Máquina", sets: adjustSets("3x 10 reps"), intensity: 'intenso', rest: '90s' },
                    { name: "Levantamento Terra Romeno (RDL)", sets: adjustSets("3x 10 reps"), obs: "Foco em posterior e glúteo", intensity: 'intenso', rest: '90s' },
                    { name: "Remada Curvada", sets: adjustSets("3x 12 reps"), intensity: 'moderado', rest: '75s' },
                ];
            }
        }
    };

    const handleGenerate = () => {
        if (!local || !focus || !time || !level) return;

        setStep('loading');
        let stageIndex = 0;
        const interval = setInterval(() => {
            if (stageIndex < loadingStages.length) {
                setLoadingText(loadingStages[stageIndex]);
                stageIndex++;
            }
        }, 700);

        setTimeout(() => {
            clearInterval(interval);
            const w = generateWorkoutDB(local, focus, time, level);
            setWorkout(w);
            setWarmUp(generateWarmUp(focus));
            setCoolDown(generateCoolDown());

            // Calorie estimation
            const baseCalPerExercise = focus === 'Full Body' ? 60 : 45;
            const timeMult = time === '15-30min' ? 0.7 : time === '30-45min' ? 1 : 1.3;
            const levelMult = level === 'Iniciante' ? 0.8 : level === 'Avançado' ? 1.2 : 1;
            setEstimatedCalories(Math.round(w.length * baseCalPerExercise * timeMult * levelMult));

            setStep('result');
        }, 3800);
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark pb-32">
            <SEOHead
                title="Gerador de Treino Rápido para Mulheres | Artemis Fit"
                description="Gere um treino de hipertrofia personalizado em segundos baseado no seu tempo, equipamento e nível. Ferramenta gratuita."
                canonicalUrl="https://artemisfit.online/guia/gerador-de-treino"
            />

            <nav className="px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between sticky top-0 z-40">
                <Link to="/guia" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Guia Artemis
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">
                    <Zap size={12} /> Gerador
                </div>
            </nav>

            <main className="max-w-2xl mx-auto pt-16 px-6">
                <AnimatePresence mode="wait">
                    {/* INPUT STEP */}
                    {step === 'input' && (
                        <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}>
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">
                                    Gerador de <span className="text-primary italic">Treino</span>
                                </h1>
                                <p className="text-white/50">Insira suas condições e receba uma estrutura imediata focada em hipertrofia feminina com aquecimento e descanso.</p>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-dark-surface border border-white/10 shadow-2xl space-y-10">
                                {/* Local */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
                                        <MapPin size={16} className="text-primary" /> 1. Onde você vai treinar?
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {(['Casa', 'Academia'] as Local[]).map(o => (
                                            <button key={o} onClick={() => setLocal(o)}
                                                className={`p-4 rounded-2xl border transition-all font-bold ${local === o ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'}`}>
                                                {o}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Focus */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
                                        <Dumbbell size={16} className="text-primary" /> 2. Foco Muscular
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {(['Membros Inferiores', 'Membros Superiores', 'Full Body'] as Focus[]).map(o => (
                                            <button key={o} onClick={() => setFocus(o)}
                                                className={`p-4 rounded-2xl border transition-all font-bold text-sm ${focus === o ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'}`}>
                                                {o}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Level - NEW */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
                                        <BarChart3 size={16} className="text-primary" /> 3. Seu Nível
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {(['Iniciante', 'Intermediário', 'Avançado'] as Level[]).map(o => (
                                            <button key={o} onClick={() => setLevel(o)}
                                                className={`p-4 rounded-2xl border transition-all font-bold text-sm ${level === o ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'}`}>
                                                {o}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
                                        <Clock size={16} className="text-primary" /> 4. Tempo Disponível
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {(['15-30min', '30-45min', '45-60min'] as Time[]).map(o => (
                                            <button key={o} onClick={() => setTime(o)}
                                                className={`p-4 rounded-2xl border transition-all font-bold text-sm ${time === o ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'}`}>
                                                {o}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={!local || !focus || !time || !level}
                                    className="w-full py-5 bg-white text-dark rounded-full font-bold text-lg hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                                    Gerar Treino Completo <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* LOADING STEP */}
                    {step === 'loading' && (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 relative mb-8">
                                <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                                <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold font-display tracking-wide">{loadingText}</h2>
                            <p className="text-white/40 mt-4 max-w-sm">Estruturando treino de hipertrofia feminina para nível {level?.toLowerCase()}.</p>
                        </motion.div>
                    )}

                    {/* RESULT STEP */}
                    {step === 'result' && (
                        <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4 bg-primary/10 px-4 py-2 rounded-full">
                                    <CheckCircle2 size={16} /> Treino Gerado
                                </div>
                            </div>

                            <EmailGate
                                toolName="workout_generator"
                                toolResults={{ local, focus, time, level, exerciseCount: workout.length, estimatedCalories }}
                                previewContent={
                                    /* Preview: Summary tags + calorie estimate */
                                    <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-5"><Dumbbell size={100} /></div>

                                        <div className="flex flex-wrap gap-3 mb-6 relative z-10">
                                            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white/50">{local}</div>
                                            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white/50">{focus}</div>
                                            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white/50">{time}</div>
                                            <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-xs font-bold text-primary">{level}</div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 relative z-10">
                                            <div className="text-center p-3 bg-white/5 rounded-xl">
                                                <Dumbbell size={16} className="text-primary mx-auto mb-1" />
                                                <div className="text-lg font-bold">{workout.length}</div>
                                                <div className="text-[10px] text-white/30">Exercícios</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/5 rounded-xl">
                                                <Flame size={16} className="text-orange-400 mx-auto mb-1" />
                                                <div className="text-lg font-bold">~{estimatedCalories}</div>
                                                <div className="text-[10px] text-white/30">kcal estimadas</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/5 rounded-xl">
                                                <Clock size={16} className="text-blue-400 mx-auto mb-1" />
                                                <div className="text-lg font-bold">{time}</div>
                                                <div className="text-[10px] text-white/30">Duração</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            >
                                {/* ========== FULL WORKOUT (after email unlock) ========== */}

                                {/* Warm-up */}
                                <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-6 mb-4 shadow-xl">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                                        <Heart size={14} className="text-red-400" /> Aquecimento ({warmUp.length} exercícios)
                                    </h3>
                                    <div className="space-y-2">
                                        {warmUp.map((ex, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-sm">
                                                <span className="text-white/70">{ex.name}</span>
                                                <span className="text-red-400/60 font-bold text-xs shrink-0 ml-2">{ex.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main Workout */}
                                <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-6 mb-4 shadow-xl">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                                        <Dumbbell size={14} className="text-primary" /> Treino Principal
                                    </h3>
                                    <div className="space-y-4">
                                        {workout.map((ex, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="p-4 bg-white/5 rounded-2xl border border-white/5"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                                    <div className="flex-1">
                                                        <div className="font-bold text-base mb-1">{ex.name}</div>
                                                        {ex.obs && <div className="text-xs text-primary mb-2">{ex.obs}</div>}
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${intensityColors[ex.intensity]}`}>
                                                                {ex.intensity}
                                                            </span>
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/10 text-white/40 flex items-center gap-1">
                                                                <Timer size={8} /> Descanso: {ex.rest}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 py-2 bg-dark rounded-xl text-sm font-bold text-white/80 shrink-0 text-center">
                                                        {ex.sets}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cool-down */}
                                <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-6 mb-6 shadow-xl">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                                        <Activity size={14} className="text-blue-400" /> Desaquecimento
                                    </h3>
                                    <div className="space-y-2">
                                        {coolDown.map((ex, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl text-sm">
                                                <span className="text-white/70">{ex.name}</span>
                                                <span className="text-blue-400/60 font-bold text-xs shrink-0 ml-2">{ex.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </EmailGate>

                            {/* CTA Block */}
                            <div className="p-8 bg-black border border-white/10 rounded-[2rem] relative overflow-hidden mt-8">
                                <div className="absolute top-0 left-0 w-1 bg-red-500 h-full"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                        <AlertTriangle className="text-red-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Aviso de Performance Oculta</h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                                            Este treino está estruturalmente correto, mas foi gerado <b>às cegas</b>.
                                            <br /><br />
                                            A IA não analisou em que fase do <b>Ciclo Menstrual</b> você está (o que define seu poder de carga hoje) e nem sua <b>Recuperação Sistêmica</b>. Planilhas estáticas levam à estagnação em 3 semanas.
                                        </p>
                                        <a href="https://app.artemisfit.online" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-dark rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(205,255,0,0.4)]">
                                            <Zap size={18} /> Deixar a IA periodizar automaticamente
                                        </a>
                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <button onClick={() => { setStep('input'); setLocal(null); setFocus(null); setTime(null); setLevel(null); }}
                                                className="text-xs font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">
                                                Gerar novo treino
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
