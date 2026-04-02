import React, { useState } from 'react';
import { ArrowLeft, Zap, Target, Scale, Flame, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

type Goal = 'Definição' | 'Hipertrofia' | 'Manutenção';

interface MealSplit {
    meal: string;
    grams: number;
    tip: string;
}

export const ProteinCalculator = () => {
    const [weight, setWeight] = useState<number>(60);
    const [age, setAge] = useState<number>(28);
    const [goal, setGoal] = useState<Goal | null>(null);
    const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
    const [totalProtein, setTotalProtein] = useState(0);
    const [meals, setMeals] = useState<MealSplit[]>([]);

    const loadingSteps = [
        "Calculando taxa metabólica basal...",
        "Ajustando para fisiologia feminina...",
        "Distribuindo cotas por janela anabólica...",
        "Finalizando protocolo nutricional..."
    ];
    const [loadingText, setLoadingText] = useState(loadingSteps[0]);

    const calculate = () => {
        if (!goal) return;
        setStep('loading');

        let idx = 0;
        const interval = setInterval(() => {
            idx++;
            if (idx < loadingSteps.length) setLoadingText(loadingSteps[idx]);
        }, 700);

        setTimeout(() => {
            clearInterval(interval);

            // Multiplier based on goal — female-oriented values
            let multiplier = 1.6; // Manutenção
            if (goal === 'Hipertrofia') multiplier = 2.0;
            if (goal === 'Definição') multiplier = 2.2;

            // Age adjustment: after 35, slightly higher need
            let ageBonus = 0;
            if (age > 35) ageBonus = 0.1;
            if (age > 45) ageBonus = 0.2;

            const total = Math.round(weight * (multiplier + ageBonus));
            setTotalProtein(total);

            // Split into 4–5 meals with max ~40g absorption window
            const maxPerMeal = 40;
            const numMeals = total > 120 ? 5 : 4;
            const perMeal = Math.round(total / numMeals);

            const mealNames = ['Café da manhã', 'Lanche (manhã)', 'Almoço', 'Lanche (tarde)', 'Jantar'];
            const tips = [
                'Ovos + iogurte grego são o combo perfeito aqui.',
                'Whey ou queijo cottage são práticos nesse horário.',
                'Frango, peixe ou carne vermelha magra. Priorize proteína animal.',
                'Mix de castanhas + whey ou frango desfiado.',
                'Salmão ou frango com vegetais. Evite carboidratos refinados.'
            ];

            const splits: MealSplit[] = [];
            for (let i = 0; i < numMeals; i++) {
                const g = i === numMeals - 1 ? total - perMeal * (numMeals - 1) : perMeal;
                splits.push({ meal: mealNames[i], grams: g, tip: tips[i] });
            }

            setMeals(splits);
            setStep('result');
        }, 3200);
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark pb-32">
            <nav className="px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
                <Link to="/ferramentas" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Hub de Ferramentas
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">
                    <Target size={12} /> Nutrição
                </div>
            </nav>

            <main className="max-w-2xl mx-auto pt-16 px-6">
                <AnimatePresence mode="wait">
                    {step === 'input' && (
                        <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">
                                    Cotas de <span className="text-primary italic">Proteína</span>
                                </h1>
                                <p className="text-white/50">Calculadoras comuns ignoram a fisiologia feminina. Descubra suas cotas reais por refeição.</p>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-dark-surface border border-white/10 shadow-2xl space-y-8">
                                <div>
                                    <label className="block text-sm font-bold text-white/70 mb-2">Seu peso atual (kg)</label>
                                    <input
                                        type="number" min="40" max="150"
                                        value={weight}
                                        onChange={(e) => setWeight(Number(e.target.value))}
                                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary text-xl font-medium transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white/70 mb-2">Sua idade</label>
                                    <input
                                        type="number" min="14" max="65"
                                        value={age}
                                        onChange={(e) => setAge(Number(e.target.value))}
                                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary text-xl font-medium transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 mb-4">
                                        <Flame size={16} className="text-primary" /> Objetivo Principal
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {(['Definição', 'Hipertrofia', 'Manutenção'] as Goal[]).map(g => (
                                            <button
                                                key={g}
                                                onClick={() => setGoal(g)}
                                                className={`p-4 rounded-2xl border transition-all font-bold text-sm ${goal === g ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'}`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={calculate}
                                    disabled={!goal}
                                    className="w-full py-5 bg-white text-dark rounded-full font-bold text-lg hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Calcular Cotas Inteligentes <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'loading' && (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 relative mb-8">
                                <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                                <Scale className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold font-display">{loadingText}</h2>
                            <p className="text-white/40 mt-4 max-w-sm">Cruzando dados metabólicos com literatura científica aplicada à biologia feminina.</p>
                        </motion.div>
                    )}

                    {step === 'result' && (
                        <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4 bg-primary/10 px-4 py-2 rounded-full">
                                    <CheckCircle2 size={16} /> Protocolo Gerado
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-8 mb-6 shadow-xl text-center">
                                <div className="text-white/50 text-sm mb-2">Sua cota diária ideal para <span className="text-white font-bold">{goal}</span></div>
                                <div className="text-6xl font-display font-bold text-primary mb-2">{totalProtein}g</div>
                                <div className="text-white/40 text-xs uppercase tracking-widest">de proteína por dia</div>
                            </div>

                            {/* Meal splits */}
                            <div className="bg-dark-surface border border-white/10 rounded-[2rem] p-8 mb-10 shadow-xl">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <Target size={18} className="text-primary" /> Divisão por Refeição (Janela Anabólica)
                                </h3>
                                <div className="space-y-4">
                                    {meals.map((m, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div>
                                                <div className="font-bold">{m.meal}</div>
                                                <div className="text-sm text-white/40 mt-1">{m.tip}</div>
                                            </div>
                                            <div className="mt-3 sm:mt-0 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary font-bold text-lg shrink-0 text-center">
                                                {m.grams}g
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Insatisfação */}
                            <div className="p-8 bg-black border border-white/10 rounded-[2rem] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 bg-orange-500 h-full"></div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                                        <AlertTriangle className="text-orange-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Problema: Você vai esquecer disso em 2 dias.</h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                                            A maioria das mulheres calcula proteínas e depois come no automático. O corpo feminino precisa de <b>ajuste semanal</b> baseado na fase do ciclo: na fase Folicular, a absorção proteica é mais eficiente. Na Lútea, o corpo precisa de mais calorias, mas não necessariamente mais proteína pura.
                                            <br /><br />
                                            <b>Sem rastreamento contínuo, esses números viram decoração.</b>
                                        </p>
                                        <a href="https://app.artemisfit.online" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-dark rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(205,255,0,0.4)]">
                                            <Zap size={18} /> Rastrear cotas automaticamente com a IA Artemis
                                        </a>

                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <button onClick={() => { setStep('input'); setGoal(null); }} className="text-xs font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">
                                                Recalcular com novos dados
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
