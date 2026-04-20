// ===================================================================
// GUIDE CONTENT DATA
// All content for the InteractiveGuide page
// ===================================================================

export interface CyclePhaseInfo {
  name: string;
  days: string;
  color: string;
  colorBg: string;
  emoji: string;
  hormones: { name: string; level: 'baixo' | 'subindo' | 'alto' | 'caindo' };
  training: { title: string; tips: string[] };
  nutrition: { title: string; tips: string[] };
  sleep: { title: string; tip: string };
  mood: { title: string; tip: string };
}

export const cyclePhases: CyclePhaseInfo[] = [
  {
    name: 'Menstrual',
    days: 'Dias 1–5',
    color: 'text-red-400',
    colorBg: 'bg-red-400/10 border-red-400/30',
    emoji: '🩸',
    hormones: [
      { name: 'Estrogênio', level: 'baixo' },
      { name: 'Progesterona', level: 'baixo' },
      { name: 'FSH', level: 'subindo' },
    ] as any,
    training: {
      title: 'Treino com Cautela',
      tips: [
        'Reduza o volume de séries em 20-30%, mas mantenha cargas moderadas',
        'Evite ir até a falha muscular — pare 2-3 reps antes',
        'Mobilidade e yoga podem ser aliados nos dias de maior desconforto',
        'Se sentir bem, pode treinar normalmente — escute seu corpo',
      ],
    },
    nutrition: {
      title: 'Nutrição Anti-inflamatória',
      tips: [
        'Priorize alimentos ricos em ferro: carne vermelha, feijão, espinafre',
        'Aumente omega-3: salmão, sardinha, chia, linhaça',
        'Magnésio ajuda com cólicas: chocolate amargo 70%+, abacate, banana',
        'Hidrate mais que o normal — a perda de fluidos é maior',
      ],
    },
    sleep: {
      title: 'Sono pode ser mais leve',
      tip: 'Cólicas e desconforto podem atrapalhar. Use bolsa de água quente e tente dormir 8h+.',
    },
    mood: {
      title: 'Energia mais baixa',
      tip: 'É normal se sentir mais introspectiva. Não se cobre por ter menos disposição — isso é biológico, não preguiça.',
    },
  },
  {
    name: 'Folicular',
    days: 'Dias 6–13',
    color: 'text-emerald-400',
    colorBg: 'bg-emerald-400/10 border-emerald-400/30',
    emoji: '🌱',
    hormones: [
      { name: 'Estrogênio', level: 'subindo' },
      { name: 'Progesterona', level: 'baixo' },
      { name: 'Testosterona', level: 'subindo' },
    ] as any,
    training: {
      title: 'Seu Pico de Performance',
      tips: [
        'É o MELHOR momento para buscar recordes pessoais (PR)',
        'Aumente volume e intensidade — seu corpo aguenta mais',
        'Alta tolerância à dor muscular e recuperação acelerada',
        'Ideal para treinos pesados de força e hipertrofia',
      ],
    },
    nutrition: {
      title: 'Janela Anabólica Otimizada',
      tips: [
        'Aproveite a melhor sensibilidade à insulina do mês',
        'Carboidratos complexos são seus melhores amigos agora',
        'Proteína: mantenha 1.8-2.2g/kg para aproveitar a síntese muscular acelerada',
        'Pode incluir mais carboidratos pré-treino sem medo',
      ],
    },
    sleep: {
      title: 'Sono profundo e restaurador',
      tip: 'O estrogênio subindo melhora a qualidade do sono. Aproveite para otimizar a recuperação muscular dormindo 7-8h.',
    },
    mood: {
      title: 'Energia alta e motivação',
      tip: 'Você se sente mais confiante, social e energizada. Use isso a seu favor nos treinos e em novos desafios.',
    },
  },
  {
    name: 'Ovulatória',
    days: 'Dias 14–16',
    color: 'text-orange-400',
    colorBg: 'bg-orange-400/10 border-orange-400/30',
    emoji: '⚡',
    hormones: [
      { name: 'Estrogênio', level: 'alto' },
      { name: 'LH', level: 'alto' },
      { name: 'Testosterona', level: 'alto' },
    ] as any,
    training: {
      title: 'Força Máxima — com Cuidado',
      tips: [
        'Força muscular no pico absoluto do mês',
        'ATENÇÃO: estrogênio alto = frouxidão ligamentar aumentada',
        'Aquecimento articular DOBRADO, especialmente joelhos',
        'Cuidado extra com agachamento profundo e exercícios de impacto',
      ],
    },
    nutrition: {
      title: 'Alimentação para Performance',
      tips: [
        'Mantenha proteína alta: é o momento de melhor síntese',
        'Antioxidantes ajudam: frutas vermelhas, vegetais coloridos',
        'Cálcio e vitamina D para proteger articulações e ligamentos',
        'Hidratação adequada é crucial para performance máxima',
      ],
    },
    sleep: {
      title: 'Pode ter mais dificuldade',
      tip: 'O pico de estrogênio pode causar noites mais agitadas em algumas mulheres. Mantenha rotina de sono consistente.',
    },
    mood: {
      title: 'Pico de energia e confiança',
      tip: 'Você está no auge da energia e do bem-estar. Momento ideal para desafios pessoais e sociais.',
    },
  },
  {
    name: 'Lútea',
    days: 'Dias 17–28',
    color: 'text-yellow-400',
    colorBg: 'bg-yellow-400/10 border-yellow-400/30',
    emoji: '🌙',
    hormones: [
      { name: 'Estrogênio', level: 'caindo' },
      { name: 'Progesterona', level: 'alto' },
      { name: 'Serotonina', level: 'caindo' },
    ] as any,
    training: {
      title: 'Treino Estratégico',
      tips: [
        'Reduza cargas em 10-15% e foque em técnica perfeita',
        'Priorize hipertrofia com tempo sob tensão (TUT) alto',
        'Retenção de líquido pode mascarar resultados — é temporário',
        'Cardio leve-moderado ajuda com sintomas de TPM',
      ],
    },
    nutrition: {
      title: 'Metabolismo Acelerado',
      tips: [
        'Sua taxa metabólica basal sobe 100-300kcal/dia — fome é NORMAL',
        'Não restrinja radicalmente: seu corpo precisa de mais energia agora',
        'Aumente magnésio e B6 para reduzir sintomas de TPM',
        'Chocolate amargo 70%+ é permitido e benéfico (magnésio!)',
      ],
    },
    sleep: {
      title: 'Sono pode ser perturbado',
      tip: 'A progesterona alta pode causar sonolência durante o dia mas insônia à noite. Melatonina e rotinas ajudam.',
    },
    mood: {
      title: 'TPM pode aparecer',
      tip: 'Irritabilidade, ansiedade e mudanças de humor são efeitos da queda de serotonina. Exercício moderado é um dos melhores remédios naturais.',
    },
  },
];

// ===================================================================
// QUIZ DATA
// ===================================================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'biggest_challenge',
    question: 'Qual é seu MAIOR desafio no treino hoje?',
    options: [
      { label: 'Falta de consistência / motivação', value: 'consistency', emoji: '😔' },
      { label: 'Não sei se estou evoluindo', value: 'progress', emoji: '🤷‍♀️' },
      { label: 'Dor ou desconforto durante o treino', value: 'pain', emoji: '🤕' },
      { label: 'Não sei o que comer', value: 'nutrition', emoji: '🍽️' },
    ],
  },
  {
    id: 'cycle_knowledge',
    question: 'Você sabia que o ciclo menstrual afeta sua performance no treino?',
    options: [
      { label: 'Não fazia ideia!', value: 'no_idea', emoji: '😲' },
      { label: 'Já ouvi falar mas não entendo', value: 'heard', emoji: '🤔' },
      { label: 'Sei por cima mas não aplico', value: 'basic', emoji: '📚' },
      { label: 'Sim, e adapto meu treino', value: 'expert', emoji: '💪' },
    ],
  },
  {
    id: 'training_frequency',
    question: 'Quantas vezes por semana você consegue treinar?',
    options: [
      { label: '1-2 vezes', value: '1-2', emoji: '1️⃣' },
      { label: '3-4 vezes', value: '3-4', emoji: '3️⃣' },
      { label: '5-6 vezes', value: '5-6', emoji: '5️⃣' },
      { label: 'Depende da semana', value: 'varies', emoji: '🔄' },
    ],
  },
  {
    id: 'goal',
    question: 'Qual seu principal objetivo agora?',
    options: [
      { label: 'Ganhar massa muscular', value: 'muscle', emoji: '💪' },
      { label: 'Perder gordura / definir', value: 'fat_loss', emoji: '🔥' },
      { label: 'Melhorar saúde e disposição', value: 'health', emoji: '❤️' },
      { label: 'Todas as anteriores', value: 'all', emoji: '⭐' },
    ],
  },
  {
    id: 'biggest_doubt',
    question: 'Qual sua maior dúvida sobre treino feminino?',
    options: [
      { label: 'Posso treinar pesado menstruada?', value: 'period_training', emoji: '🏋️‍♀️' },
      { label: 'Como adaptar treino ao ciclo?', value: 'cycle_adapt', emoji: '📅' },
      { label: 'Quanta proteína eu realmente preciso?', value: 'protein', emoji: '🥩' },
      { label: 'Como saber se estou em overtraining?', value: 'overtraining', emoji: '😰' },
    ],
  },
];

// ===================================================================
// MYTHS VS FACTS
// ===================================================================

export interface MythFact {
  statement: string;
  isMyth: boolean;
  explanation: string;
}

export const mythsFacts: MythFact[] = [
  {
    statement: 'Treinar menstruada faz mal e pode piorar as cólicas.',
    isMyth: true,
    explanation: 'Exercício moderado na verdade REDUZ cólicas ao liberar endorfinas. Apenas ajuste a intensidade se o desconforto for grande.',
  },
  {
    statement: 'O ciclo menstrual afeta diretamente sua força e performance muscular.',
    isMyth: false,
    explanation: 'Verdade! As flutuações hormonais ao longo do ciclo alteram significativamente sua capacidade de força, resistência e recuperação.',
  },
  {
    statement: 'Mulheres devem evitar treino pesado para não ficar "musculosa demais".',
    isMyth: true,
    explanation: 'Mulheres têm 15-20x menos testosterona que homens. Treinar pesado gera definição e tônus, não volume exagerado.',
  },
  {
    statement: 'Na fase lútea, seu metabolismo basal aumenta até 300kcal/dia.',
    isMyth: false,
    explanation: 'Verdade! A progesterona elevada aumenta o gasto calórico basal. A fome extra que você sente é uma resposta biológica real.',
  },
  {
    statement: 'Você precisa treinar todos os dias para ter resultados.',
    isMyth: true,
    explanation: 'O músculo cresce no DESCANSO, não no treino. 3-5 dias bem estruturados são mais eficientes que 7 dias sem recuperação adequada.',
  },
  {
    statement: 'O pico de estrogênio na ovulação aumenta o risco de lesão nos ligamentos.',
    isMyth: false,
    explanation: 'Verdade! O estrogênio alto causa frouxidão ligamentar, especialmente no joelho. Aquecimento articular redobrado é essencial nessa fase.',
  },
  {
    statement: 'Cardio em jejum queima mais gordura que treino de força.',
    isMyth: true,
    explanation: 'Treino de força gera o "efeito EPOC" — seu corpo continua queimando calorias por até 48h depois. Cardio em jejum pode até catabolizar músculo.',
  },
  {
    statement: 'A fase folicular é o melhor momento do mês para buscar recordes pessoais.',
    isMyth: false,
    explanation: 'Verdade! Estrogênio e testosterona subindo = mais força, melhor recuperação, maior tolerância à dor. Aproveite!',
  },
];

// ===================================================================
// FAQ DATA
// ===================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Posso treinar pesado durante a menstruação?',
    answer: 'Sim! Na maioria dos casos, exercício alivia cólicas e melhora o humor. A recomendação é reduzir o volume (menos séries), manter as cargas moderadas e evitar ir até a falha muscular. Se a dor for muito intensa, opte por mobilidade ou yoga. Escute sempre seu corpo.',
  },
  {
    question: 'Como sei em qual fase do ciclo estou?',
    answer: 'O ciclo começa no primeiro dia da menstruação (Dia 1). A fase menstrual vai do dia 1 ao 5, a folicular do 6 ao 13, a ovulatória do 14 ao 16, e a lútea do 17 ao 28 (em ciclos de 28 dias). Use nossa calculadora gratuita para descobrir automaticamente!',
  },
  {
    question: 'Quanta proteína eu realmente preciso por dia?',
    answer: 'Para mulheres que treinam, a recomendação é de 1.6g a 2.2g por kg de peso corporal. Na hipertrofia, fique mais perto de 2.0g/kg. Na definição, suba para 2.2g/kg para preservar massa muscular. Distribua em 4-5 refeições com máximo de ~40g por refeição para absorção otimizada.',
  },
  {
    question: 'O ciclo menstrual realmente afeta minha força?',
    answer: 'Sim, significativamente! Na fase folicular e ovulatória, estrogênio e testosterona elevados aumentam sua capacidade de força em até 10-15%. Na fase lútea, a progesterona alta tende a reduzir levemente a performance. Adaptar seu treino a essas variações pode fazer uma diferença enorme nos seus resultados.',
  },
  {
    question: 'Treinar todo dia é bom ou ruim?',
    answer: 'Geralmente ruim. O músculo precisa de 48-72h de recovery entre estímulos intensos no mesmo grupo muscular. Treinar 7 dias sem descanso adequado leva ao overtraining: queda de performance, fadiga crônica, risco de lesão e estagnação dos resultados. 4-5 dias com 2 de descanso é o ideal para a maioria.',
  },
  {
    question: 'É normal sentir mais fome antes da menstruação?',
    answer: 'Totalmente normal e biológico! Na fase lútea, sua taxa metabólica basal pode subir de 100 a 300kcal/dia. Seu corpo literalmente precisa de mais energia. Não restrinja radicalmente — alimente-se de forma inteligente com alimentos nutritivos. Chocolate amargo 70%+ é uma ótima opção (tem magnésio!).',
  },
  {
    question: 'Whey protein é necessário ou posso só comer alimentos?',
    answer: 'Whey é um suplemento de CONVENIÊNCIA, não de necessidade. Se você consegue atingir suas cotas de proteína com alimentos (frango, ovos, peixe, carne, laticínios), não precisa de whey. Ele é útil quando a praticidade é importante — como um shake rápido pós-treino ou entre refeições.',
  },
  {
    question: 'Treinar de manhã ou à noite faz diferença?',
    answer: 'A ciência mostra leve vantagem para treinos à tarde/noite em termos de performance de força (corpo mais aquecido, hormônios mais otimizados). MAS o melhor horário é aquele em que você CONSEGUE treinar consistentemente. Consistência vence o horário "perfeito" todos os dias.',
  },
  {
    question: 'Como evitar a estagnação nos treinos?',
    answer: 'Estagnação vem de falta de progressão. A cada 2-3 semanas, tente progredir em carga, volume (mais séries/reps) ou técnica (tempo sob tensão, paused reps). O corpo se adapta ao estímulo repetitivo — você precisa variar inteligentemente. O Artemis Fit faz isso automaticamente com IA.',
  },
  {
    question: 'O que é mais importante: treino ou dieta?',
    answer: 'São inseparáveis. Treino sem dieta adequada = resultados lentos. Dieta sem treino = perda de músculo junto com gordura. Para hipertrofia, ambos precisam estar alinhados. Se fosse obrigada a escolher um para focar: TREINO para ganho muscular, DIETA para perda de gordura.',
  },
];

// ===================================================================
// ACTION PLAN STEPS
// ===================================================================

export interface ActionStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  isCTA?: boolean;
}

export const actionSteps: ActionStep[] = [
  {
    step: 1,
    title: 'Rastreie seu Ciclo',
    description: 'Saiba em que fase do ciclo você está. Isso muda tudo sobre como seu corpo responde ao treino, alimentação e descanso.',
    icon: '📅',
  },
  {
    step: 2,
    title: 'Adapte seu Treino',
    description: 'Ajuste intensidade, volume e tipo de exercício de acordo com sua fase hormonal. Treine COM seu corpo, não contra ele.',
    icon: '🏋️‍♀️',
  },
  {
    step: 3,
    title: 'Ajuste sua Nutrição',
    description: 'Suas necessidades de proteína, carboidrato e calorias mudam ao longo do ciclo. Personalize sua alimentação para cada fase.',
    icon: '🥗',
  },
  {
    step: 4,
    title: 'Deixe a IA Fazer Isso Por Você',
    description: 'O Artemis Fit integra ciclo + treino + nutrição em uma inteligência artificial que se adapta a você todos os dias automaticamente.',
    icon: '🤖',
    isCTA: true,
  },
];
