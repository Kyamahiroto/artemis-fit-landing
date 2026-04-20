import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Activity, AlertTriangle, Zap, Share2, ClipboardCheck, Moon, Utensils, Brain, Heart, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { EmailGate } from '../components/EmailGate';

type Phase = 'Menstrual' | 'Folicular' | 'Ovulatória' | 'Lútea' | null;

// Hormone bar component
const HormoneBar: React.FC<{ name: string; level: number; color: string }> = ({ name, level, color }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-white/50 w-24 text-right font-medium">{name}</span>
    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 0.3 }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
    <span className="text-[10px] text-white/30 w-10">{level}%</span>
  </div>
);

// Cycle Wheel SVG
const CycleWheel: React.FC<{ currentDay: number; cycleLength: number; phase: Phase }> = ({ currentDay, cycleLength, phase }) => {
  const phaseColors: Record<string, string> = {
    Menstrual: '#f87171',
    Folicular: '#34d399',
    Ovulatória: '#fb923c',
    Lútea: '#facc15',
  };
  const progress = (currentDay / cycleLength) * 100;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        {/* Background track */}
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        {/* Phase sectors */}
        {[
          { start: 0, end: 5/28, color: '#f87171' },
          { start: 5/28, end: 13/28, color: '#34d399' },
          { start: 13/28, end: 16/28, color: '#fb923c' },
          { start: 16/28, end: 1, color: '#facc15' },
        ].map((sector, i) => {
          const sectorLen = (sector.end - sector.start) * circumference;
          const sectorOffset = circumference - sector.start * circumference;
          return (
            <circle
              key={i}
              cx="70" cy="70" r={radius}
              fill="none"
              stroke={sector.color}
              strokeWidth="8"
              strokeDasharray={`${sectorLen} ${circumference - sectorLen}`}
              strokeDashoffset={sectorOffset}
              opacity={0.2}
            />
          );
        })}
        {/* Progress indicator */}
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={phase ? phaseColors[phase] : '#fff'}
          strokeWidth="8"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-display font-bold">{currentDay}</span>
        <span className="text-[10px] text-white/40 uppercase tracking-widest">Dia</span>
      </div>
    </div>
  );
};

export const CycleCalculator = () => {
    const [cycleLength, setCycleLength] = useState<number>(28);
    const [lastPeriod, setLastPeriod] = useState<string>('');
    const [resultPhase, setResultPhase] = useState<Phase>(null);
    const [currentDay, setCurrentDay] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [daysToNextPhase, setDaysToNextPhase] = useState(0);

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

            if (currentCycleDay >= 1 && currentCycleDay <= 5) {
                setResultPhase('Menstrual');
                setDaysToNextPhase(6 - currentCycleDay);
            }
            else if (currentCycleDay >= 6 && currentCycleDay <= 13) {
                setResultPhase('Folicular');
                setDaysToNextPhase(14 - currentCycleDay);
            }
            else if (currentCycleDay >= 14 && currentCycleDay <= 16) {
                setResultPhase('Ovulatória');
                setDaysToNextPhase(17 - currentCycleDay);
            }
            else {
                setResultPhase('Lútea');
                setDaysToNextPhase(cycleLength - currentCycleDay + 1);
            }

            setLoading(false);
        }, 800);
    };

    const phaseData = {
        Menstrual: {
            alert: "Seu corpo está em alto esforço inflamatório.",
            impact: "Força cai até 15%. Risco maior de fadiga sistêmica rápida.",
            action: "Mantenha a carga mas reduza o volume de séries. Não vá até a falha real hoje.",
            color: "text-red-400 font-bold",
            bg: "bg-red-400/10 border-red-400/30",
            hormones: { estrogen: 15, progesterone: 10, testosterone: 20, fsh: 40 },
            nutrition: [
                "Priorize ferro: carne vermelha, feijão, espinafre",
                "Aumente omega-3: salmão, sardinha, chia",
                "Magnésio para cólicas: chocolate 70%+, abacate",
            ],
            sleep: "Durma 8h+. Bolsa de água quente alivia desconforto e melhora qualidade do sono.",
            mood: "Energia mais baixa e introspecção são normais. Não é preguiça — é biologia.",
            weekForecast: ['🟡', '🟡', '🟢', '🟢', '🟢', '🟢', '🟢'],
        },
        Folicular: {
            alert: "Níveis subindo: Você está entrando no seu pico de performance.",
            impact: "Alta tolerância à dor e recuperação muscular otimizada.",
            action: "É o momento ideal para buscar PR (Recordes Pessoais) e aumentar volume.",
            color: "text-primary font-bold",
            bg: "bg-primary/10 border-primary/30",
            hormones: { estrogen: 65, progesterone: 15, testosterone: 55, fsh: 50 },
            nutrition: [
                "Carboidratos complexos pré-treino são seus aliados",
                "Proteína 2.0g/kg para aproveitar síntese acelerada",
                "Melhor sensibilidade à insulina do mês",
            ],
            sleep: "Sono profundo e restaurador. Aproveite para recuperação muscular dormindo 7-8h.",
            mood: "Confiança, energia alta e motivação. Melhor momento para novos desafios!",
            weekForecast: ['🟢', '🟢', '🟢', '🟢', '🟠', '🟠', '🟠'],
        },
        Ovulatória: {
            alert: "Pico de Estrogênio: Força extrema, mas atenção aos ligamentos.",
            impact: "Força máxima ativada, porém frouxidão ligamentar pode trazer risco de lesão no joelho.",
            action: "Treine pesado, mas faça aquecimento articular dobrado. Cuidado extra no Agachamento.",
            color: "text-orange-400 font-bold",
            bg: "bg-orange-400/10 border-orange-400/30",
            hormones: { estrogen: 95, progesterone: 20, testosterone: 80, fsh: 30 },
            nutrition: [
                "Antioxidantes: frutas vermelhas, vegetais coloridos",
                "Cálcio e vitamina D para proteger articulações",
                "Proteína alta: melhor momento de síntese muscular",
            ],
            sleep: "Noites podem ser mais agitadas. Mantenha rotina de sono consistente.",
            mood: "Pico absoluto de energia, confiança e sociabilidade. Use a seu favor!",
            weekForecast: ['🟠', '🟠', '🟡', '🟡', '🟡', '🟡', '🟡'],
        },
        Lútea: {
            alert: "Queda hormonal + Temperatura basal alta.",
            impact: "Queima calórica basal aumenta de 100 a 300 kcal/dia. Mas a força muscular tem leve queda e retenção de líquido sobe.",
            action: "Abaixe um pouco as cargas, mantenha bom tempo de tensão (hipertrofia focada). Fome é normal, não restrinja radicalmente.",
            color: "text-yellow-400 font-bold",
            bg: "bg-yellow-400/10 border-yellow-400/30",
            hormones: { estrogen: 40, progesterone: 85, testosterone: 30, fsh: 15 },
            nutrition: [
                "Metabolismo +100-300kcal/dia: fome extra é NORMAL",
                "Magnésio e B6 para reduzir TPM",
                "Chocolate amargo 70%+ é permitido e benéfico",
            ],
            sleep: "Progesterona alta pode causar sonolência de dia e insônia à noite. Melatonina pode ajudar.",
            mood: "TPM: irritabilidade e ansiedade são efeito da queda de serotonina. Exercício moderado é remédio natural.",
            weekForecast: ['🟡', '🟡', '🟡', '🔴', '🔴', '🔴', '🔴'],
        }
    };

    const handleShare = () => {
        const text = `Meu Perfil Artemis: Hoje estou no Dia ${currentDay} do biológico (Fase ${resultPhase}). O que significa: ${resultPhase ? phaseData[resultPhase].impact : ''} Descubra o seu na Calculadora Artemis!`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const intensityLabels: Record<string, string> = { '🟢': 'Alto', '🟠': 'Médio', '🟡': 'Moderado', '🔴': 'Leve' };

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark">
            <SEOHead
                title="Calculadora de Ciclo Menstrual e Treino | Artemis Fit"
                description="Descubra em que fase do ciclo você está e como isso afeta sua força, recuperação e desempenho no treino. Ferramenta gratuita."
                canonicalUrl="https://artemisfit.online/guia/ciclo-e-treino"
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

                            {/* ========== EMAIL GATE WRAPPER ========== */}
                            <EmailGate
                                toolName="cycle_calculator"
                                toolResults={{
                                    phase: resultPhase,
                                    cycleDay: currentDay,
                                    cycleLength,
                                    daysToNextPhase,
                                }}
                                previewContent={
                                    /* PREVIEW: Main result card — always visible */
                                    <div className="bg-dark-surface p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-xl relative overflow-hidden" id="shareable-result">
                                        <div className="absolute top-0 right-0 p-6 opacity-5">
                                            <Sparkles size={120} />
                                        </div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Activity size={16} className="text-primary" /></div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Perfil Biológico Artemis</span>
                                        </div>

                                        {/* Cycle Wheel */}
                                        <CycleWheel currentDay={currentDay} cycleLength={cycleLength} phase={resultPhase} />

                                        <div className="text-center mt-6">
                                            <div className="mb-2 text-white/50 font-medium">Hoje você está no <span className="text-white font-bold">Dia {currentDay}</span> do seu ciclo.</div>
                                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
                                                Fase <span className={phaseData[resultPhase].color}>{resultPhase}</span>
                                            </h2>
                                            <div className="text-sm text-white/30">
                                                Próxima fase em <span className="text-white font-bold">{daysToNextPhase} dia{daysToNextPhase !== 1 ? 's' : ''}</span>
                                            </div>
                                        </div>

                                        {/* Main alert */}
                                        <div className={`p-4 rounded-2xl border ${phaseData[resultPhase].bg} mt-8`}>
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle size={20} className={`mt-0.5 ${phaseData[resultPhase].color}`} />
                                                <div>
                                                    <div className={`font-bold mb-1 ${phaseData[resultPhase].color}`}>{phaseData[resultPhase].alert}</div>
                                                    <p className="text-sm opacity-90">{phaseData[resultPhase].impact}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            >
                                {/* ========== FULL DETAILS (after email unlock) ========== */}

                                {/* Hormone Panel */}
                                <div className="bg-dark-surface p-6 rounded-[2rem] border border-white/10 shadow-xl mb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5 flex items-center gap-2">
                                        <Heart size={14} className="text-primary" /> Painel Hormonal
                                    </h3>
                                    <div className="space-y-3">
                                        <HormoneBar name="Estrogênio" level={phaseData[resultPhase].hormones.estrogen} color="bg-pink-400" />
                                        <HormoneBar name="Progesterona" level={phaseData[resultPhase].hormones.progesterone} color="bg-purple-400" />
                                        <HormoneBar name="Testosterona" level={phaseData[resultPhase].hormones.testosterone} color="bg-blue-400" />
                                        <HormoneBar name="FSH" level={phaseData[resultPhase].hormones.fsh} color="bg-cyan-400" />
                                    </div>
                                </div>

                                {/* Training directive */}
                                <div className="bg-dark-surface p-6 rounded-[2rem] border border-white/10 shadow-xl mb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                                        <Activity size={14} className="text-primary" /> Como Treinar Hoje
                                    </h3>
                                    <p className="text-lg leading-relaxed">{phaseData[resultPhase].action}</p>
                                </div>

                                {/* Nutrition Card */}
                                <div className="bg-dark-surface p-6 rounded-[2rem] border border-white/10 shadow-xl mb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                                        <Utensils size={14} className="text-primary" /> Nutrição Nesta Fase
                                    </h3>
                                    <div className="space-y-2">
                                        {phaseData[resultPhase].nutrition.map((tip, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                                                <span className="text-primary mt-0.5">•</span> {tip}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sleep & Mood */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-dark-surface p-5 rounded-2xl border border-white/10 shadow-xl">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
                                            <Moon size={12} className="text-primary" /> Sono
                                        </h4>
                                        <p className="text-sm text-white/60 leading-relaxed">{phaseData[resultPhase].sleep}</p>
                                    </div>
                                    <div className="bg-dark-surface p-5 rounded-2xl border border-white/10 shadow-xl">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
                                            <Brain size={12} className="text-primary" /> Humor e Energia
                                        </h4>
                                        <p className="text-sm text-white/60 leading-relaxed">{phaseData[resultPhase].mood}</p>
                                    </div>
                                </div>

                                {/* Weekly Forecast */}
                                <div className="bg-dark-surface p-6 rounded-[2rem] border border-white/10 shadow-xl mb-6">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                                        <Calendar size={14} className="text-primary" /> Previsão da Semana
                                    </h3>
                                    <div className="grid grid-cols-7 gap-2">
                                        {phaseData[resultPhase].weekForecast.map((level, i) => (
                                            <div key={i} className="text-center">
                                                <div className="text-[10px] text-white/30 mb-2">{weekDays[i]}</div>
                                                <div className="text-lg mb-1">{level}</div>
                                                <div className="text-[9px] text-white/25">{intensityLabels[level]}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Share button */}
                                <div className="flex justify-center mb-10">
                                    <button onClick={handleShare} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold">
                                        {copied ? <><ClipboardCheck size={16} className="text-primary" /> Copiado para você colar!</> : <><Share2 size={16} /> Copiar meu Resumo Biológico</>}
                                    </button>
                                </div>
                            </EmailGate>

                            {/* CTA Block — always visible */}
                            <div className="text-center p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem] mt-8">
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
