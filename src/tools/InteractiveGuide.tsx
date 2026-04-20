import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  ArrowLeft, Zap, Sparkles, ChevronRight, ChevronDown,
  CheckCircle2, XCircle, HelpCircle, BookOpen, Brain,
  ArrowRight, Star, Target,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import {
  cyclePhases, quizQuestions, mythsFacts, faqItems, actionSteps,
  type QuizQuestion,
} from '../data/guideContent';

// ===================================================================
// ANIMATED SECTION WRAPPER
// ===================================================================
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children, className = '', delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ===================================================================
// SECTION HEADER COMPONENT
// ===================================================================
const SectionHeader: React.FC<{ tag: string; title: React.ReactNode; subtitle?: string }> = ({
  tag, title, subtitle,
}) => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-5">
      <Sparkles size={10} /> {tag}
    </div>
    <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">{title}</h2>
    {subtitle && <p className="text-white/40 max-w-xl mx-auto text-sm">{subtitle}</p>}
  </div>
);

// ===================================================================
// FLIP CARD COMPONENT (CYCLE PHASES)
// ===================================================================
const PhaseFlipCard: React.FC<{ phase: typeof cyclePhases[0]; index: number }> = ({ phase, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 cursor-pointer h-full min-h-[340px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 rounded-[1.5rem] border p-6 flex flex-col items-center justify-center text-center ${phase.colorBg}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-5xl mb-4">{phase.emoji}</div>
          <h3 className={`text-2xl font-bold font-display mb-2 ${phase.color}`}>{phase.name}</h3>
          <p className="text-white/50 text-sm mb-2">{phase.days}</p>
          <div className="mt-4 space-y-2">
            {phase.hormones.map((h: any, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs text-white/40">
                <span className="w-20 text-right font-medium">{h.name}</span>
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      h.level === 'alto' ? 'w-full bg-primary' :
                      h.level === 'subindo' ? 'w-2/3 bg-primary/70' :
                      h.level === 'caindo' ? 'w-1/3 bg-yellow-400/70' :
                      'w-1/6 bg-red-400/50'
                    }`}
                  />
                </div>
                <span className="text-[10px] w-14">{h.level}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[10px] uppercase tracking-widest text-white/20 font-bold flex items-center gap-1">
            Toque para ver detalhes <ChevronRight size={10} />
          </div>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 rounded-[1.5rem] border p-5 overflow-y-auto ${phase.colorBg}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">{phase.emoji}</span>
            <h3 className={`text-lg font-bold ${phase.color}`}>{phase.name}</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-white/80 mb-1.5">🏋️ {phase.training.title}</h4>
              <ul className="space-y-1 text-white/50">
                {phase.training.tips.slice(0, 2).map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white/80 mb-1.5">🥗 {phase.nutrition.title}</h4>
              <ul className="space-y-1 text-white/50">
                {phase.nutrition.tips.slice(0, 2).map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white/80 mb-1.5">😴 {phase.sleep.title}</h4>
              <p className="text-white/50">{phase.sleep.tip}</p>
            </div>
            <div>
              <h4 className="font-bold text-white/80 mb-1.5">🧠 {phase.mood.title}</h4>
              <p className="text-white/50">{phase.mood.tip}</p>
            </div>
          </div>

          <div className="mt-4 text-[10px] uppercase tracking-widest text-white/20 font-bold text-center">
            Toque para voltar
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ===================================================================
// QUIZ COMPONENT
// ===================================================================
const QuizSection: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isDone, setIsDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQ < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      setTimeout(() => {
        setIsDone(true);
        setShowConfetti(true);
        // Save quiz data to localStorage for potential upload
        const storedEmail = localStorage.getItem('artemis_lead_email');
        if (storedEmail) {
          try {
            fetch('https://vgraihcqjyfbsnmilsxt.supabase.co/functions/v1/capture-lead', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: storedEmail,
                source_tool: 'interactive_guide_quiz',
                quiz_data: newAnswers,
              }),
            }).catch(() => {});
          } catch {}
        }
        setTimeout(() => setShowConfetti(false), 3000);
      }, 300);
    }
  };

  const getPersonalizedTip = () => {
    const challenge = answers['biggest_challenge'];
    const tips: Record<string, string> = {
      consistency: 'Consistência vem de sistemas, não de motivação. O Artemis Fit cria rotinas automáticas que se adaptam à SUA vida e ao seu ciclo.',
      progress: 'Sem métricas de progresso, é impossível saber se você está evoluindo. Rastreamento de cargas, medidas e performance é essencial.',
      pain: 'Dor pode ser sinal de técnica incorreta, overtraining ou treino na fase errada do ciclo. Uma IA que adapta o treino à sua biologia resolve isso.',
      nutrition: 'Suas necessidades nutricionais mudam ao longo do ciclo. Cotas fixas não funcionam para o corpo feminino.',
    };
    return tips[challenge] || 'Cada corpo feminino é único. A Artemis adapta treino, nutrição e descanso ao SEU ciclo biológico.';
  };

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {!isDone ? (
          <motion.div
            key={`quiz-q-${currentQ}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="bg-dark-surface border border-white/10 rounded-[2rem] p-8 shadow-xl"
          >
            {/* Progress */}
            <div className="flex gap-1.5 mb-6">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i <= currentQ ? 'bg-primary' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3 font-bold">
              {currentQ + 1} de {quizQuestions.length}
            </div>
            <h3 className="text-xl font-bold mb-6">{quizQuestions[currentQ].question}</h3>

            <div className="space-y-3">
              {quizQuestions[currentQ].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(quizQuestions[currentQ].id, opt.value)}
                  className="w-full text-left p-4 rounded-2xl border bg-white/5 border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all font-medium text-sm flex items-center gap-3 group"
                >
                  <span className="text-lg">{opt.emoji}</span>
                  <span className="flex-1">{opt.label}</span>
                  <ChevronRight size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-surface border border-primary/20 rounded-[2rem] p-8 shadow-xl text-center relative overflow-hidden"
          >
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 1, y: -20,
                      x: Math.random() * 300 - 150,
                      rotate: 0,
                    }}
                    animate={{
                      opacity: 0, y: 300,
                      rotate: Math.random() * 720,
                    }}
                    transition={{ duration: 2 + Math.random(), delay: Math.random() * 0.5 }}
                    className="absolute top-0 left-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ['#CDFF00', '#FF6B6B', '#4ECDC4', '#FFE66D', '#A0E7E5'][i % 5],
                    }}
                  />
                ))}
              </div>
            )}

            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-3">Quiz Completo! 🎉</h3>
            <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">{getPersonalizedTip()}</p>

            <a
              href="https://app.artemisfit.online"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-dark rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_30px_-5px_rgba(205,255,0,0.4)]"
            >
              <Zap size={18} /> Experimentar o Artemis Fit Agora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===================================================================
// MYTHS CARD COMPONENT
// ===================================================================
const MythCard: React.FC<{ item: typeof mythsFacts[0]; index: number }> = ({ item, index }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onClick={() => setRevealed(true)}
      className={`p-6 rounded-[1.5rem] border cursor-pointer transition-all duration-500 ${
        revealed
          ? (item.isMyth
            ? 'bg-red-500/5 border-red-500/20'
            : 'bg-emerald-500/5 border-emerald-500/20')
          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
          revealed
            ? (item.isMyth ? 'bg-red-500/20' : 'bg-emerald-500/20')
            : 'bg-white/10'
        }`}>
          {revealed ? (
            item.isMyth
              ? <XCircle size={16} className="text-red-400" />
              : <CheckCircle2 size={16} className="text-emerald-400" />
          ) : (
            <HelpCircle size={16} className="text-white/40" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm leading-snug">{item.statement}</p>
        </div>
      </div>

      <AnimatePresence>
        {revealed ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="ml-11"
          >
            <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-2 ${
              item.isMyth
                ? 'bg-red-500/20 text-red-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {item.isMyth ? '❌ Mito' : '✅ Verdade'}
            </div>
            <p className="text-white/50 text-xs leading-relaxed">{item.explanation}</p>
          </motion.div>
        ) : (
          <div className="ml-11 text-[10px] uppercase tracking-widest text-white/20 font-bold flex items-center gap-1">
            Toque para revelar <ChevronRight size={10} />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===================================================================
// FAQ ACCORDION COMPONENT
// ===================================================================
const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {faqItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
              openIndex === i
                ? 'bg-primary/5 border-primary/20'
                : 'bg-white/[0.03] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold text-sm pr-4">{item.question}</h3>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0"
              >
                <ChevronDown size={18} className={openIndex === i ? 'text-primary' : 'text-white/30'} />
              </motion.div>
            </div>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/50 text-sm leading-relaxed mt-4 pt-4 border-t border-white/5">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

// ===================================================================
// MAIN PAGE COMPONENT
// ===================================================================
export const InteractiveGuide = () => {
  const userName = localStorage.getItem('artemis_lead_name');

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark">
      <SEOHead
        title="Guia Interativo de Treino e Ciclo Menstrual | Artemis Fit"
        description="Guia completo e interativo sobre como adaptar seu treino ao ciclo menstrual. Fases, nutrição, mitos, FAQ e quiz personalizado. Grátis."
        canonicalUrl="https://artemisfit.online/guia/seu-guia"
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <Link to="/guia" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Ferramentas
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">
          <BookOpen size={12} /> Guia Interativo
        </div>
      </nav>

      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={12} /> Guia Exclusivo Artemis
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 max-w-3xl mx-auto leading-tight">
            {userName ? (
              <>{userName}, este é o seu<br /><span className="italic text-primary">Guia de Treino + Ciclo</span></>
            ) : (
              <>Seu Guia Completo de<br /><span className="italic text-primary">Treino + Ciclo Menstrual</span></>
            )}
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
            Tudo que você precisa saber para treinar respeitando sua biologia — de forma interativa, visual e direto ao ponto.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-white/30 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> 4 Fases do Ciclo</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Quiz Personalizado</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> FAQ Científico</span>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: CYCLE PHASES (FLIP CARDS) */}
      {/* ============================================================ */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionHeader
            tag="Entenda seu Corpo"
            title={<>As <span className="text-primary italic">4 Fases</span> do seu Ciclo</>}
            subtitle="Cada fase muda completamente como seu corpo responde ao treino, nutrição e descanso. Toque nos cards para explorar."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cyclePhases.map((phase, i) => (
            <AnimatedSection key={phase.name} delay={i * 0.1}>
              <PhaseFlipCard phase={phase} index={i} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: QUIZ */}
      {/* ============================================================ */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <AnimatedSection>
          <SectionHeader
            tag="Quiz Rápido"
            title={<>Qual é o seu <span className="text-primary italic">maior desafio?</span></>}
            subtitle="Responda 5 perguntas rápidas para recebermos uma dica personalizada para você."
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <QuizSection />
        </AnimatedSection>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: MYTHS VS FACTS */}
      {/* ============================================================ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <AnimatedSection>
          <SectionHeader
            tag="Derrube os Mitos"
            title={<><span className="text-primary italic">Mito</span> ou <span className="text-emerald-400 italic">Verdade?</span></>}
            subtitle="Toque em cada afirmação para descobrir se é mito ou verdade. Você vai se surpreender."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4">
          {mythsFacts.map((item, i) => (
            <MythCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: FAQ */}
      {/* ============================================================ */}
      <section className="py-20 px-6">
        <AnimatedSection>
          <SectionHeader
            tag="Dúvidas Frequentes"
            title={<>As <span className="text-primary italic">10 perguntas</span> mais comuns</>}
            subtitle="Respostas diretas e baseadas em ciência sobre treino e ciclo menstrual."
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <FAQAccordion />
        </AnimatedSection>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: ACTION PLAN TIMELINE */}
      {/* ============================================================ */}
      <section className="py-20 px-6 max-w-2xl mx-auto">
        <AnimatedSection>
          <SectionHeader
            tag="Seu Plano de Ação"
            title={<>4 Passos para <span className="text-primary italic">resultados reais</span></>}
            subtitle="Um roadmap simples para parar de treinar às cegas e começar a evoluir de verdade."
          />
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-8">
            {actionSteps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="flex gap-6 items-start">
                  {/* Step indicator */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative z-10 text-lg ${
                    step.isCTA
                      ? 'bg-primary text-dark shadow-[0_0_20px_-5px_rgba(205,255,0,0.4)]'
                      : 'bg-dark-surface border border-white/10'
                  }`}>
                    {step.icon}
                  </div>

                  <div className={`flex-1 p-6 rounded-2xl border ${
                    step.isCTA
                      ? 'bg-primary/5 border-primary/20'
                      : 'bg-white/[0.03] border-white/10'
                  }`}>
                    <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">
                      Passo {step.step}
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${step.isCTA ? 'text-primary' : ''}`}>
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>

                    {step.isCTA && (
                      <a
                        href="https://app.artemisfit.online"
                        className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary text-dark rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(205,255,0,0.4)]"
                      >
                        <Zap size={16} /> Começar Agora com IA
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: FINAL CTA */}
      {/* ============================================================ */}
      <section className="py-20 px-6">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto relative">
            {/* Glow background */}
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl opacity-30" />

            <div className="relative p-10 md:p-14 rounded-[2.5rem] border border-primary/20 bg-dark-surface text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target size={150} />
              </div>

              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Zap size={28} className="text-primary" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Pronta para treinar<br />
                <span className="text-primary italic">de verdade?</span>
              </h2>

              <p className="text-white/50 max-w-lg mx-auto mb-8">
                Este guia te mostrou O QUE fazer. O Artemis Fit faz isso AUTOMATICAMENTE — adaptando treino, nutrição e descanso ao seu ciclo em tempo real, todos os dias, com inteligência artificial.
              </p>

              <a
                href="https://app.artemisfit.online"
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-dark rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-5px_rgba(205,255,0,0.5)]"
              >
                <Zap size={22} /> Testar o Artemis Fit Grátis
              </a>

              <p className="text-white/20 text-xs mt-6">Sem cartão. Sem compromisso. Cancele quando quiser.</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-center text-white/20 text-xs border-t border-white/5">
        <p>© {new Date().getFullYear()} Artemis Fit. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-4 mt-3">
          <Link to="/privacidade" className="hover:text-primary transition-colors">Privacidade</Link>
          <Link to="/termos" className="hover:text-primary transition-colors">Termos</Link>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  );
};
