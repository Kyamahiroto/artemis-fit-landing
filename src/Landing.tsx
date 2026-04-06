import {
  ArrowRight,
  Zap,
  Activity,
  Target,
  Calendar,
  Brain,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const SectionCTA = ({ text = "Acessar o App", href = "https://app.artemisfit.online" }: { text?: string; href?: string }) => (
  <div className="flex justify-center mt-12 mb-16 px-4 md:px-6">
    <a href={href} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-dark rounded-full font-bold text-lg md:text-xl hover:bg-primary transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3">
      <Zap size={24} /> {text} <ChevronRight size={20} />
    </a>
  </div>
);

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollY / height) * 100;
      setVisible(percentage > 15 && percentage < 95);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://app.artemisfit.online"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-[100] px-8 py-4 bg-primary text-dark rounded-full font-bold shadow-[0_0_30px_-5px_rgba(205,255,0,0.5)] flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Zap size={18} /> Acessar Artemis <ArrowRight size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

const ScrollPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollY / height) * 100;
      if (percentage > 65 && percentage < 85) setShow(true);
      else setShow(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-28 right-8 z-[100] max-w-sm glass p-6 rounded-3xl border border-white/10 shadow-2xl md:bottom-32"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles size={20} />
            </div>
            <div className="font-bold text-sm">Pergunta rápida...</div>
          </div>
          <p className="text-white/80 text-sm mb-6 leading-relaxed">
            Você chegou até aqui. Pronta pra treinar com estratégia?
          </p>
          <a href="https://app.artemisfit.online" className="w-full py-3 bg-primary text-dark rounded-xl font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2">
            <Zap size={16} /> Acessar App
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 transition-all duration-300 ${scrolled ? 'py-2 bg-dark/95 backdrop-blur-lg border-b border-white/10' : 'py-4 bg-dark/80 backdrop-blur-md border-b border-white/5'} md:px-12 md:py-6`}>
      <div className="flex items-center gap-1 sm:gap-4 shrink-0">
        <img src="/logo.png" alt="Artemis Fit Logo" className={`transition-all duration-300 ${scrolled ? 'h-6 sm:h-7 md:h-10' : 'h-8 sm:h-10 md:h-16'} w-auto`} />
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <a href="#features" className="hover:text-primary transition-colors">Tecnologia</a>
        <a href="/guia" className="hover:text-primary transition-colors flex items-center gap-1"><Sparkles size={14} /> Guia Artemis</a>
        <a href="#ecosystem" className="hover:text-primary transition-colors">Ecossistema</a>
        <a href="#final" className="hover:text-primary transition-colors">Beta</a>
      </div>
      <div className="flex items-center gap-2">
        <a href="https://app.artemisfit.online" className="whitespace-nowrap px-3 sm:px-4 py-2 bg-primary text-dark rounded-full text-[12px] sm:text-sm font-bold hover:scale-105 transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_15px_-3px_rgba(205,255,0,0.3)] shrink-0">
          <Zap size={14} /> Acessar App
        </a>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center pt-40 px-6 overflow-hidden">
    {/* Background Image & Overlay */}
    <div className="absolute inset-0 z-0 select-none pointer-events-none">
      <img src="/hero-bg.png" alt="" className="w-full h-full object-cover object-center md:object-[70%_center] opacity-40 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark backdrop-blur-sm" />
    </div>

    {/* Background Glows */}
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />

    <div className="relative z-10 max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6"
      >
        <Sparkles size={14} />
        🔥 Acesso antecipado limitado
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[2.1rem] xs:text-[2.4rem] sm:text-5xl md:text-8xl font-bold font-display leading-[1.1] md:leading-[0.9] mb-8 md:mb-10 tracking-tight"
      >
        Você não está <span className="text-primary italic">falhando</span> no treino. <br className="hidden md:block" />
        Seu treino que não <span className="text-primary italic">entende você.</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10 text-[10px] md:text-sm font-bold uppercase tracking-widest"
      >
        <span className="text-white/20 line-through">Fitness App</span>
        <ArrowRight size={14} className="text-primary" />
        <span className="text-primary">Sistema de Performance Feminina</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base md:text-xl text-white/60 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4"
      >
        Seu corpo não é padrão. O Artemis adapta treinos, nutrição e evolução ao seu ciclo e desempenho real de forma inteligente.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a href="https://app.artemisfit.online" className="w-full sm:w-auto px-8 py-4 bg-primary text-dark rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 glow-green">
          <Zap size={20} /> Acessar o App <ArrowRight size={20} />
        </a>
        <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-center flex items-center justify-center">
          Ver tecnologia
        </a>
      </motion.div>

      {/* Micro-prova */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 flex items-center justify-center gap-2 text-white/40 text-sm font-medium"
      >
        <CheckCircle2 size={16} className="text-primary" />
        +500 treinos registrados na fase beta
      </motion.div>
    </div>

    {/* Hero Image / Mockup */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="relative mt-20 w-full max-w-6xl mx-auto px-4"
    >
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop"
          alt="Mulher treinando força muscular focada em alta performance com o método adaptado Artemis Fit"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

        {/* Floating App UI Elements */}
        <div className="absolute bottom-10 left-10 hidden md:block">
          <div className="glass p-6 rounded-2xl w-64">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-white/40 uppercase">Artemis Score</span>
              <Activity className="text-primary w-4 h-4" />
            </div>
            <div className="text-4xl font-bold mb-1">94.2</div>
            <div className="text-xs text-primary font-medium">Performance Ótima</div>
            <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[94%]" />
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 hidden md:block">
          <div className="glass p-6 rounded-2xl w-72">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="text-primary w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold">IA Artemis</div>
                <div className="text-[10px] text-white/40 uppercase">Recomendação de hoje</div>
              </div>
            </div>
            <p className="text-sm text-white/80 italic">
              "Seu ciclo está na fase lútea. Reduza a carga em 15% hoje para preservar a recuperação."
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const SocialStats = () => (
  <div className="relative z-10 -mt-10 mb-20 px-4 md:px-6">
    <div className="max-w-4xl mx-auto glass rounded-3xl p-6 md:p-8 flex flex-wrap justify-center gap-6 md:gap-24 border border-white/10 shadow-2xl">
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-bold font-display text-primary mb-1">+500</div>
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Treinos na Beta</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-bold font-display text-primary mb-1">98%</div>
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Acurácia IA</div>
      </div>
      <div className="text-center border-l border-white/10 pl-6 md:pl-24 hidden sm:block">
        <div className="text-2xl md:text-4xl font-bold font-display text-primary mb-1">24%</div>
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Mais Consistência</div>
      </div>
    </div>
  </div>
);

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative aspect-[3/4] sm:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none group">
      {/* Before Image */}
      <div className="absolute inset-0 w-full h-full">
        <img src="/before.png" alt="Antes" className="w-full h-full object-cover grayscale brightness-[0.7] transition-all duration-300 pointer-events-none" />
        <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80 border border-white/10 z-10 transition-opacity">
          Treino Padrão
        </div>
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <img src="/after.png" alt="Depois" className="w-full h-full object-cover brightness-110 pointer-events-none" />
        <div className="absolute top-6 right-6 bg-primary px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-dark shadow-[0_0_20px_rgba(205,255,0,0.3)] z-10 transition-opacity">
          Com Artemis
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center top-0 bottom-0 pointer-events-none z-20"
        style={{ left: `calc(${sliderPos}% - 1px)` }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="flex gap-[3px]">
            <div className="w-[2px] h-4 bg-dark/40 rounded-full" />
            <div className="w-[2px] h-4 bg-dark/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Actual Input Range */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0 p-0 z-30"
      />
    </div>
  );
};

const Problem = () => (
  <section className="py-24 md:py-48 px-6 bg-dark-surface">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div>
        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">O Problema</h2>
        <h3 className="text-[2.2rem] md:text-6xl font-bold font-display mb-8 leading-tight tracking-tight">
          Por que você sente que <span className="text-white/40 italic">está travada?</span>
        </h3>
        <p className="text-lg text-white/60 mb-12">
          O fitness tradicional foi desenhado para o corpo masculino, que opera em ciclos de 24 horas. O corpo feminino é cíclico, complexo e não linear.
        </p>

        <div className="space-y-6">
          {[
            "“Você se esforça, mas não vê resultado”",
            "“Tem dias que seu corpo simplesmente não responde”",
            "“Você se esforça… mas não evolui”",
            "“Tem semanas que seu corpo simplesmente trava”",
            "“Você acha que é falta de disciplina — mas não é”",
            "Treinar pesado quando seu corpo pede descanso"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="mt-1 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
              <span className="text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <BeforeAfterSlider />
        <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl max-w-xs hidden lg:block">
          <p className="text-xl font-medium leading-relaxed">
            "Eu treinava 6x por semana e me sentia exausta, sem ver mudança no espelho."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10" />
            <div>
              <div className="text-sm font-bold">Mariana S.</div>
              <div className="text-xs text-white/40">Usuária Beta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SectionCTA text="Quero treinar com estratégia" />
  </section>
);

const CoreFeatures = () => {
  const features = [
    {
      icon: <Brain className="text-primary" />,
      title: "IA Protagonista",
      desc: "Um treinador que entende o corpo feminino em tempo real, prevendo fadiga e otimizando cada série."
    },
    {
      icon: <TrendingUp className="text-primary" />,
      title: "Artemis Score",
      desc: <>
        <span className="text-primary font-bold block mb-2">“Sem isso, você está treinando no escuro.”</span>
        A métrica definitiva da sua performance. Esqueça o peso na balança, foque no que realmente importa.
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Simulação de Impacto:</div>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="text-xs font-bold mb-1">Nutrição</div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[40%]" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold mb-1">Recuperação</div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[60%]" />
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-primary font-bold italic">“Seu score está sendo limitado por esses fatores.”</div>
        </div>
      </>
    },
    {
      icon: <Calendar className="text-primary" />,
      title: "Bio-Sincronização",
      desc: "Ajustes automáticos de carga e volume baseados na sua fase hormonal e sintomas."
    }
  ];

  return (
    <section id="features" className="py-24 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">A Ciência</h2>
          <h3 className="text-[2.2rem] md:text-7xl font-bold font-display leading-tight tracking-tight">
            Inteligência que <br /><span className="italic text-white/40">lê seu corpo.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-dark-surface border border-white/5 hover:border-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{f.title}</h4>
              <p className="text-white/60 text-lg leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Intelligence = () => (
  <section className="py-24 md:py-48 px-6 bg-dark overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">A Lógica</h2>
        <h3 className="text-[2.2rem] md:text-7xl font-bold font-display mb-8 leading-tight tracking-tight">Veja como o <span className="text-primary italic">Artemis pensa.</span></h3>
        <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto px-4">
          Diferente de apps que te dão uma lista estática, o Artemis reprograma o seu dia com base na sua biologia.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            day: "Dia 01",
            phase: "Menstruação",
            energy: "Baixa",
            action: "Treino leve + Mobilidade",
            logic: "Foco em reduzir inflamação e manter fluxo sanguíneo.",
            active: false
          },
          {
            day: "Dia 14",
            phase: "Ovulação",
            energy: "Pico",
            action: "Treino Pesado / PR",
            logic: "Testosterona e Estrógeno no auge. Hora de quebrar recordes.",
            active: true
          },
          {
            day: "Dia 21",
            phase: "Fase Lútea",
            energy: "Instável",
            action: "Foco Técnico / Deload",
            logic: "Progesterona alta. Foco em técnica e evitar burnout.",
            active: false
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-8 rounded-[2rem] border ${item.active ? 'bg-primary/5 border-primary/20 shadow-[0_0_50px_-12px_rgba(205,255,0,0.1)]' : 'bg-white/5 border-white/10 opacity-60'}`}
          >
            <div className={`text-xs font-bold uppercase tracking-widest mb-6 ${item.active ? 'text-primary' : 'text-white/40'}`}>
              {item.day} • {item.phase}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className={item.active ? 'text-primary' : 'text-white/40'} size={18} />
              <span className="text-xl font-bold">Energia: {item.energy}</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-6 text-sm font-medium">
              PRESCRIÇÃO: <span className={item.active ? 'text-primary' : 'text-white'}>{item.action}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed italic">"{item.logic}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);


const SmartWorkout = () => {
  const [objetivo, setObjetivo] = useState<string | null>(null);
  const [local, setLocal] = useState<string | null>(null);

  const workoutPreviews: Record<string, Record<string, { title: string; exercises: string[] }>> = {
    'Emagrecer': {
      'Casa': { title: 'Queima de Gordura — Sem Equipamento', exercises: ['Agachamento 4×15', 'Afundo 3×12', 'Prancha 3×45s', 'Abdominal Bicicleta 3×20', 'Burpee Modificado 3×10'] },
      'Academia': { title: 'Circuito Metabólico', exercises: ['Leg Press 4×15', 'Esteira HIIT 20min', 'Abdominal Infra 3×20', 'Remada Baixa 3×12', 'Prancha 3×45s'] },
    },
    'Definir': {
      'Casa': { title: 'Definição Corporal — Peso Corporal', exercises: ['Flexão 4×12', 'Agachamento Sumo 4×15', 'Elevação Pélvica 4×20', 'Agachamento 4×15', 'Prancha Lateral 3×30s'] },
      'Academia': { title: 'Definição Muscular — Halter + Máquina', exercises: ['Supino Inclinado 4×12', 'Cadeira Extensora 4×15', 'Rosca Direta 3×12', 'Elevação Lateral 3×15', 'Abdominal Tradicional 3×25'] },
    },
    'Ganhar Força': {
      'Casa': { title: 'Força Funcional — Progressiva', exercises: ['Agachamento Búlgaro 4×10', 'Flexão Diamante 4×10', 'Stiff com Garrafa 4×12', 'Prancha com Movimento 3×40s', 'Afundo Reverso 3×12'] },
      'Academia': { title: 'Força Base — Compostos', exercises: ['Levantamento Terra 4×6', 'Supino Reto 4×8', 'Puxada Frontal 4×8', 'Desenvolvimento Ombro 3×10', 'Agachamento Livre 4×8'] },
    },
  };

  const preview = objetivo && local ? workoutPreviews[objetivo]?.[local] : null;

  const flowSteps = [
    { q: 'Casa ou academia?', a: 'Academia', icon: <Target size={18} className="text-primary" /> },
    { q: 'Quantos dias por semana?', a: '3 dias', icon: <Calendar size={18} className="text-primary" /> },
    { q: 'Qual seu objetivo?', a: 'Definir corpo', icon: <TrendingUp size={18} className="text-primary" /> },
  ];

  const benefits = [
    { icon: <Zap size={22} className="text-primary" />, title: 'Personalizado desde o dia 1', desc: 'Nada de plano genérico. Cada treino é criado com base na sua realidade.' },
    { icon: <Brain size={22} className="text-primary" />, title: 'Ajustes automáticos', desc: 'Conforme você evolui, o Artemis recalibra automaticamente sua carga e volume.' },
    { icon: <Activity size={22} className="text-primary" />, title: 'Substituição inteligente', desc: 'Sem equipamento? Sem problema. O sistema sugere a melhor alternativa.' },
    { icon: <ShieldCheck size={22} className="text-primary" />, title: 'Evolução contínua', desc: 'Você não precisa entender periodização. O sistema faz isso por você.' },
  ];

  return (
    <section className="py-32 px-6 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">Treino Inteligente</h2>
          <h3 className="text-[2.2rem] md:text-7xl font-bold font-display leading-[1.1] md:leading-[0.95] mb-6 tracking-tight">
            Seu treino não é fixo.<br /><span className="italic text-white/40">Ele evolui com você.</span>
          </h3>
          <p className="text-base md:text-xl text-white/50 max-w-2xl mx-auto px-4">
            O Artemis cria seu treino com base no seu nível, objetivo e realidade — e ajusta automaticamente conforme seu desempenho.
          </p>
        </div>

        {/* Visual Flow */}
        <div className="flex flex-col items-center gap-4 mb-24">
          <div className="grid md:grid-cols-3 gap-4 w-full max-w-3xl">
            {flowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">{step.icon}<span className="text-xs font-bold text-white/40 uppercase tracking-widest">Pergunta {i + 1}</span></div>
                <div className="text-sm text-white/70 mb-3">{step.q}</div>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold">{step.a}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm p-6 rounded-2xl bg-primary/10 border border-primary/30 text-center shadow-[0_0_40px_-10px_rgba(205,255,0,0.2)]"
          >
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">✅ Resultado</div>
            <div className="text-xl font-bold">Plano criado automaticamente</div>
            <div className="text-sm text-white/50 mt-1">Baseado nos seus dados e ciclo</div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-sm p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">🔄 Evolução</div>
            <div className="text-xl font-bold">Treino atualizado automaticamente</div>
            <div className="text-sm text-white/50 mt-1">Conforme seu progresso e desempenho</div>
          </motion.div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-6 mb-24">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-dark-surface border border-white/5 hover:border-primary/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">{b.icon}</div>
              <h4 className="font-bold text-base mb-2">{b.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Simulator */}
        <div className="p-8 md:p-12 rounded-[3rem] bg-dark-surface border border-white/10">
          <div className="text-center mb-10">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Mini Simulador</div>
            <h4 className="text-[1.8rem] md:text-4xl font-bold font-display leading-tight tracking-tight">Veja seu treino<br /><span className="italic text-white/40">antes de começar.</span></h4>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Meu objetivo</div>
                <div className="flex flex-wrap gap-3">
                  {['Emagrecer', 'Definir', 'Ganhar Força'].map((op) => (
                    <button
                      key={op}
                      onClick={() => setObjetivo(op === objetivo ? null : op)}
                      className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${objetivo === op ? 'bg-primary text-dark border-primary' : 'bg-white/5 text-white/60 border-white/10 hover:border-primary/40'}`}
                    >{op}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Onde treino</div>
                <div className="flex flex-wrap gap-3">
                  {['Casa', 'Academia'].map((op) => (
                    <button
                      key={op}
                      onClick={() => setLocal(op === local ? null : op)}
                      className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${local === op ? 'bg-primary text-dark border-primary' : 'bg-white/5 text-white/60 border-white/10 hover:border-primary/40'}`}
                    >{op}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="min-h-[200px]">
              {preview ? (
                <motion.div
                  key={`${objetivo}-${local}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-primary/5 border border-primary/20 shadow-[0_0_30px_-10px_rgba(205,255,0,0.15)]"
                >
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">✅ Treino gerado para você</div>
                  <div className="text-lg font-bold mb-4">{preview.title}</div>
                  <ul className="space-y-2">
                    {preview.exercises.map((ex, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center p-6 rounded-2xl border border-dashed border-white/10 text-white/30 text-sm text-center">
                  Selecione seu objetivo e local para ver o treino gerado
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quote + CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg md:text-2xl italic text-white/50 max-w-2xl mx-auto mb-10">
            "Não é um treino pronto. É um sistema que aprende com você."
          </p>
          <a href="https://app.artemisfit.online" className="px-10 py-5 bg-primary text-dark rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 mx-auto glow-green">
            <Zap size={22} /> Quero meu treino inteligente
          </a>
        </div>

      </div>
    </section>
  );
};


const AIExperience = () => (
  <section className="py-32 px-6 bg-dark-surface overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="space-y-6 relative z-10">
          <motion.div
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            className="glass p-6 rounded-2xl rounded-bl-none max-w-sm ml-auto"
          >
            <p className="text-sm">"Como devo treinar hoje? Estou no 22º dia do ciclo."</p>
          </motion.div>

          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            className="bg-primary p-6 rounded-2xl rounded-br-none max-w-sm text-dark font-medium"
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain size={16} />
              <span className="text-xs font-bold uppercase tracking-tighter">Artemis AI</span>
            </div>
            <p className="text-sm">"Fase lútea detectada. Sua temperatura basal subiu. Reduza a intensidade e foque em volume moderado. Priorize magnésio na ceia hoje."</p>
          </motion.div>

          <motion.div
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            className="glass p-6 rounded-2xl rounded-bl-none max-w-sm ml-auto"
          >
            <p className="text-sm">"Sinto que não estou evoluindo no agachamento."</p>
          </motion.div>

          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            className="bg-primary p-6 rounded-2xl rounded-br-none max-w-sm text-dark font-medium"
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain size={16} />
              <span className="text-xs font-bold uppercase tracking-tighter">Artemis AI</span>
            </div>
            <p className="text-sm">"Seu progresso está sendo limitado pela baixa ingestão de proteína nos últimos 4 dias. Ajuste para 1.8g/kg para recuperar as fibras."</p>
          </motion.div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">Experiência Inteligente</h2>
        <h3 className="text-[2.2rem] md:text-6xl font-bold font-display mb-8 leading-tight tracking-tight">
          Um treinador que <span className="text-primary italic">fala a sua língua.</span>
        </h3>
        <p className="text-base md:text-lg text-white/60 mb-10">
          O Artemis não apenas cospe dados. Ele interpreta o que está acontecendo com você e oferece ações práticas e imediatas.
        </p>
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <MessageSquare size={24} />
          </div>
          <div>
            <div className="font-bold">Interação Dinâmica</div>
            <div className="text-sm text-white/40">Respostas baseadas em biologia e ciência.</div>
          </div>
        </div>
        <div className="mt-12 flex justify-start">
          <SectionCTA text="Quero essa inteligência no meu treino" />
        </div>
      </div>
    </div>
  </section>
);

const VisualProof = () => (
  <section className="py-32 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">Interface</h2>
        <h3 className="text-[2.2rem] md:text-7xl font-bold font-display mb-8 leading-tight tracking-tight">
          Design de <span className="text-white/40 italic text-[2.6rem] md:text-8xl block mt-4">alta performance.</span>
        </h3>
        <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto px-4">
          Uma experiência fluida, moderna e intuitiva. Cada detalhe foi pensado para facilitar sua evolução diária.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 max-w-7xl mx-auto">
        {[
          { title: "Métricas", img: "/app-novo-1.png" },
          { title: "Evolução", img: "/app-novo-2.png" },
          { title: "Treino", img: "/app-novo-3.png" },
          { title: "Artemis Score", img: "/app-novo-4.png" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group flex flex-col items-center"
          >
            <div className="w-full mx-auto mb-8 transition-transform duration-700 group-hover:scale-[1.03]">
              <img
                src={item.img}
                alt={`Captura detalhada do módulo ${item.title} no aplicativo Artemis Fit - Treino inteligente com inteligência artificial para mulheres`}
                loading="lazy"
                className="w-full aspect-[9/19] object-cover object-top drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-[2.2rem] border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center transition-all duration-500 group-hover:translate-y-[-5px]">
              <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1 opacity-60">Módulo</div>
              <div className="text-xl font-bold font-display">{item.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="mt-24">
      <SectionCTA text="Começar gratuitamente" />
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5 bg-dark-surface">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
          <div className="mb-6">
            <img src="/logo.png" alt="Artemis Fit Logo" className="h-14 w-auto" />
          </div>
          <p className="text-white/40 max-w-sm leading-relaxed">
            O primeiro sistema de performance inteligente desenhado exclusivamente para a biologia feminina.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Produto</h4>
          <ul className="space-y-4 text-white/40 text-sm">
            <li><a href="/tecnologia" className="hover:text-primary transition-colors">Tecnologia</a></li>
            <li><a href="/artemis-score" className="hover:text-primary transition-colors">Artemis Score</a></li>
            <li><a href="/guia" className="hover:text-primary transition-colors text-primary flex items-center gap-2"><Sparkles size={14} className="text-primary" /> Guia Artemis</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-white/40 text-sm">
            <li><a href="/privacidade" className="hover:text-primary transition-colors">Privacidade</a></li>
            <li><a href="/termos" className="hover:text-primary transition-colors">Termos de Uso</a></li>
            <li><a href="/cookies" className="hover:text-primary transition-colors">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5 text-white/20 text-xs uppercase tracking-widest font-bold">
        <div>© 2026 Artemis Fit. Todos os direitos reservados.</div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 hover:text-primary transition-all duration-300 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-primary transition-colors">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          <span className="text-white/40 group-hover:text-primary transition-colors">Siga-nos no Instagram</span>
        </a>
      </div>
    </div>
  </footer>
);

export default function Landing() {
  return (
    <div className="bg-dark min-h-screen selection:bg-primary selection:text-dark">
      <Navbar />
      <FloatingCTA />
      <ScrollPopup />

      <main>
        <Hero />
        <SocialStats />
        <Problem />

        <section className="py-20 flex justify-center">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        </section>

        {/* 1. IA Protagonista */}
        <AIExperience />

        {/* 2. Artemis Score (Apoio 1) */}
        <CoreFeatures />

        {/* 3. Ciclo Menstrual (Apoio 2) */}
        <Intelligence />

        {/* 4. Treino Inteligente */}
        <SmartWorkout />

        {/* 4. Ecossistema: Tudo se conecta */}
        <section id="ecosystem" className="py-48 px-6 bg-dark-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6">Conexão</h2>
              <h3 className="text-4xl md:text-8xl font-bold font-display leading-[0.9]">Tudo se <span className="italic text-white/40">conecta.</span></h3>
              <p className="mt-8 text-xl text-white/40 max-w-2xl mx-auto">
                Não são funções separadas. É um sistema que entende como cada variável impacta sua performance.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <Zap />, title: "Treino", desc: "Ajustes de carga e volume baseados no seu estado biológico." },
                { icon: <Activity />, title: "Nutrição", desc: "Sua alimentação impacta diretamente seu desempenho — o Artemis te mostra como ajustar." },
                { icon: <Calendar />, title: "Sintomas", desc: "Bio-feedback real para evitar lesões e otimizar recuperação." },
                { icon: <Target />, title: "Progresso", desc: "Evolução estratégica sem risco de burnout ou estagnação." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 p-12 rounded-[3rem] bg-primary/5 border border-primary/20 text-center">
              <p className="text-2xl md:text-3xl font-medium leading-relaxed italic max-w-4xl mx-auto">
                “Não são funções separadas. É um sistema que conecta treino, ciclo, nutrição e recuperação em um único cérebro.”
              </p>
            </div>
          </div>
        </section>

        <VisualProof />

        <section id="final" className="py-24 md:py-32 px-6 mb-12">
          <div className="max-w-4xl mx-auto text-center glass p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-white/10">
            <h3 className="text-[2.2rem] md:text-6xl font-bold font-display mb-10 leading-tight tracking-tight">Chega de <span className="italic text-white/40">adivinhar.</span> <br />Execute com estratégia.</h3>
            <div className="flex justify-center">
              <SectionCTA text="Garantir meu acesso agora" />
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-primary text-dark">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-8xl font-bold font-display tracking-tighter mb-10 leading-[0.9]">
              <span className="text-dark/60 text-4xl md:text-6xl block mb-4">🔥 Vagas limitadas para as primeiras usuárias</span>
              Comece a evoluir com <br /> estratégia <span className="italic">hoje.</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-80 max-w-2xl mx-auto">
              Você pode continuar treinando no escuro… ou garantir seu acesso antecipado ao sistema que entende sua biologia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="https://app.artemisfit.online" className="w-full sm:w-auto px-10 py-5 bg-dark text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-3">
                <Zap size={24} /> Entrar na versão beta (vagas limitadas)
              </a>
              <div className="flex flex-col items-start bg-dark/5 p-4 rounded-2xl border border-dark/10">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-dark">
                  <Sparkles size={18} className="text-dark" />
                  Acesso Antecipado Limitado
                </div>
                <div className="text-[10px] font-bold opacity-60 uppercase mt-1">Últimas 12 vagas para a fase beta</div>
              </div>
            </div>


          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
