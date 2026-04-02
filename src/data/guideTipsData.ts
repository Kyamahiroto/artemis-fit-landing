export interface GuideTipData {
    slug: string;
    title: string;
    subtitle: string;
    paragraphs: [string, string, string];
    cta: string;
    keywords: string[];
}

export const guideTips: GuideTipData[] = [
    {
        slug: "como-adaptar-treino-fase-lutea",
        title: "Como Adaptar o Treino de Pernas na Fase Lútea",
        subtitle: "Seu corpo muda. Seu treino deveria mudar também.",
        paragraphs: [
            "A fase Lútea é o período pós-ovulação que dura aproximadamente 14 dias. Nela, os níveis de progesterona sobem drasticamente enquanto o estrogênio cai. Isso causa aumento da temperatura basal, maior retenção de líquidos e uma queda perceptível na tolerância ao esforço de alta intensidade. Em termos práticos: aquele agachamento pesado que você executa com facilidade na fase Folicular pode parecer significativamente mais difícil agora — e isso não é fraqueza, é biologia.",
            "A estratégia ideal é manter os exercícios compostos (agachamento, leg press, elevação pélvica) mas reduzir o volume total em 15-20%. Ao invés de 4 séries de 10, faça 3 séries de 8-10 com foco em tempo sob tensão. A hipertrofia nessa fase responde melhor a estímulos mecânicos controlados do que a volumes brutais. Também vale investir mais em aquecimento articular, já que a progesterona afeta a frouxidão ligamentar.",
            "O erro mais comum é ignorar completamente essas mudanças e forçar a mesma planilha de sempre. Quando o corpo não responde ao volume habitual, muitas mulheres acham que estão 'regredindo' — quando na verdade é o ciclo natural. Adaptar o treino à fase hormonal não é treinar menos, é treinar com inteligência."
        ],
        cta: "O Artemis Fit ajusta automaticamente volume e intensidade baseado na sua fase. Zero achismo.",
        keywords: ["treino fase lútea", "treino pernas ciclo menstrual", "adaptar treino ciclo"]
    },
    {
        slug: "como-adaptar-cardio-fase-folicular",
        title: "Como Adaptar o Cardio na Fase Folicular",
        subtitle: "A fase onde seu corpo está pronto para voar.",
        paragraphs: [
            "A fase Folicular começa no primeiro dia da menstruação e dura até a ovulação (aproximadamente dia 14). É quando o estrogênio sobe progressivamente, melhorando a sensibilidade à insulina, a recuperação muscular e a tolerância à dor. Em resumo: seu corpo está biologicamente preparado para performar no máximo — e o cardio não é exceção.",
            "Nessa fase, seu metabolismo de gordura é mais eficiente durante exercícios aeróbicos. É o momento ideal para sessões de HIIT (High Intensity Interval Training), corridas longas ou treinos intervalados que exigem explosão. A capacidade cardiorrespiratória atinge seu pico, e a recuperação entre séries é mais rápida. Se você vai testar um novo recorde de corrida ou um circuito intenso, faça durante a fase Folicular.",
            "O erro clássico é manter o mesmo cardio monótono (esteira 40 min, zona 2) durante todo o mês. Na fase Folicular você está desperdiçando potencial biológico real se não aumentar a intensidade. Reserve o cardio leve e regenerativo para a fase Lútea e Menstrual, onde ele faz mais sentido fisiologicamente."
        ],
        cta: "O Artemis programa automaticamente a intensidade do seu cardio por fase. Sem pensar.",
        keywords: ["cardio fase folicular", "exercício aeróbico ciclo menstrual", "HIIT fase folicular"]
    },
    {
        slug: "treino-forca-fase-ovulatoria",
        title: "Por que a Fase Ovulatória é a Melhor Para Treino de Força",
        subtitle: "Pico de estrogênio = pico de força. Mas cuidado.",
        paragraphs: [
            "A fase Ovulatória dura em média 2 a 3 dias e marca o pico absoluto de estrogênio no ciclo feminino. Isso se traduz em força muscular máxima, alta motivação para treinar e recuperação acelerada. É nessa janela que mulheres frequentemente batem recordes pessoais sem nem perceber — o corpo está literalmente otimizado para levantar peso.",
            "Porém, existe um risco oculto: o mesmo estrogênio elevado causa frouxidão ligamentar temporária, especialmente nos joelhos. Estudos mostram que lesões de LCA (Ligamento Cruzado Anterior) são significativamente mais comuns durante a ovulação. A estratégia é treinar pesado SIM, mas com aquecimento articular redobrado, foco na técnica e evitando movimentos de rotação sob carga máxima.",
            "Use essa janela para exercícios compostos pesados: agachamento livre, terra, supino. Aumente a carga em 5-10% comparado à semana anterior. Mas faça cada repetição com controle total. Potência sem consciência articular é receita para lesão nessa fase específica."
        ],
        cta: "No Artemis, a IA detecta sua fase ovulatória e ajusta cargas + alertas de segurança articular.",
        keywords: ["treino força ovulação", "fase ovulatória musculação", "pico de força ciclo menstrual"]
    },
    {
        slug: "proteina-mulheres-quanto-comer",
        title: "Quanta Proteína Uma Mulher Precisa Por Dia?",
        subtitle: "As calculadoras comuns não foram feitas para mulheres.",
        paragraphs: [
            "A recomendação padrão de 1.6g a 2.2g de proteína por kg de peso corporal é um bom ponto de partida, mas ignora um fator crucial: a fisiologia feminina muda ao longo do mês. Na fase Folicular, a sensibilidade à insulina é maior e a síntese proteica muscular é mais eficiente — seu corpo aproveita melhor cada grama. Na fase Lútea, o catabolismo aumenta e você pode precisar de até 10% mais proteína para manter o mesmo estímulo anabólico.",
            "Outro erro comum é consumir toda a cota de proteína em 1-2 refeições grandes. O corpo feminino tem uma janela de absorção ótima de aproximadamente 30-40g por refeição. Distribuir a proteína em 4-5 refeições menores maximiza a síntese muscular contínua e evita desperdício metabólico.",
            "Para mulheres acima de 35 anos, esse número sobe: a sarcopenia (perda de massa magra) se acelera, e a resposta anabólica à proteína diminui. Um bônus de 0.1g a 0.2g/kg é recomendado. Proteína não é luxo, é a base estrutural da composição corporal feminina."
        ],
        cta: "O Artemis calcula sua cota diária e distribui automaticamente por refeição com base na sua fase.",
        keywords: ["proteína para mulheres", "quanta proteína mulher precisa", "proteína hipertrofia feminina"]
    },
    {
        slug: "sono-e-hipertrofia-feminina",
        title: "Como o Sono Afeta a Hipertrofia na Mulher",
        subtitle: "Você pode treinar perfeito e perder resultados dormindo mal.",
        paragraphs: [
            "O GH (Hormônio do Crescimento), principal responsável pela recuperação e síntese muscular, é liberado em pulsos durante o sono profundo (fase N3). Mulheres que dormem menos de 6 horas têm até 60% menos picos de GH durante a noite. Na prática: o treino que você fez de manhã pode ter resultado ZERO se a noite for ruim.",
            "Além do GH, o sono regula o cortisol. Dormir pouco eleva cronicamente o cortisol, que é catabólico — ou seja, destrói massa muscular e favorece acúmulo de gordura abdominal. Na fase Lútea do ciclo, o cortisol já tende a subir naturalmente. Combinado com sono ruim, o efeito é duplamente negativo para quem busca hipertrofia.",
            "A meta mínima para mulheres que treinam hipertrofia é 7 horas de sono de qualidade. Se você tem dificuldade, o ambiente importa mais do que suplementos: quarto escuro, temperatura amena (19-21°C) e sem telas 30 minutos antes de dormir fazem mais diferença do que melatonina em 90% dos casos."
        ],
        cta: "O Artemis rastreia seu sono e ajusta o volume de treino do dia seguinte. Sono ruim = treino adaptado.",
        keywords: ["sono e hipertrofia", "sono musculação mulher", "GH sono mulheres"]
    },
    {
        slug: "overtraining-sinais-mulheres",
        title: "5 Sinais de Overtraining Que Mulheres Ignoram",
        subtitle: "Mais treino nem sempre é mais resultado.",
        paragraphs: [
            "O overtraining em mulheres se manifesta de forma diferente do que em homens. Os 5 sinais mais ignorados são: (1) Menstruação irregular ou ausente — sinal clássico de que o eixo hormonal está comprometido. (2) Insônia apesar de cansaço extremo — o sistema nervoso simpático está sobreestimulado. (3) Perda de força progressiva mesmo mantendo treino — o corpo está em catabolismo crônico.",
            "(4) Irritabilidade constante e oscilação de humor acentuada — cortisol cronicamente elevado afeta neurotransmissores. (5) Infecções frequentes (gripes, resfriados, inflamações) — o sistema imunológico é o primeiro a sofrer com overtraining. Se você tem 2 ou mais desses sintomas de forma consistente, seu volume de treino provavelmente está alto demais para sua capacidade de recuperação atual.",
            "A solução NÃO é parar de treinar. É periodizar: alternar semanas de alto volume com semanas de deload (redução de 40-50% do volume). Treinar todos os dias no mesmo nível é o caminho mais rápido para a estagnação e lesão. O corpo feminino precisa de variação planejada — não de consistência bruta."
        ],
        cta: "O Artemis detecta overtraining antes de você sentir. A IA ajusta volume automaticamente.",
        keywords: ["overtraining mulheres", "sinais overtraining feminino", "excesso de treino mulher"]
    },
    {
        slug: "fase-menstrual-pode-treinar",
        title: "Pode Treinar na Menstruação? O Que Diz a Ciência",
        subtitle: "Sim, pode. Mas não do jeito que você está fazendo.",
        paragraphs: [
            "A resposta curta é: sim, treinar menstruada é seguro e até benéfico na maioria dos casos. O exercício libera endorfinas que ajudam a reduzir cólicas menstruais, melhora o humor e diminui a sensação de inchaço. No entanto, os primeiros 2-3 dias do ciclo são marcados pelo declínio simultâneo de estrogênio e progesterona, o que reduz a tolerância ao esforço máximo.",
            "A estratégia inteligente para os dias 1-3 é manter a frequência de treino mas ajustar a intensidade: reduza cargas em 10-15%, foque em movimentos que você domina tecnicamente (evite aprender exercícios novos) e prefira exercícios com menor demanda cardiovascular. Caminhada, yoga, mobilidade ativa ou musculação leve são excelentes opções.",
            "A partir do dia 4-5, quando o sangramento diminui e o estrogênio começa a subir novamente, você pode voltar progressivamente à intensidade normal. O erro é usar a menstruação como desculpa para ficar uma semana inteira parada — isso gera perda de estímulo neuromuscular e dificulta o retorno à rotina."
        ],
        cta: "O Artemis identifica o dia do seu ciclo e sugere a intensidade exata para aquele treino.",
        keywords: ["treinar menstruada", "exercício durante menstruação", "treino fase menstrual"]
    },
    {
        slug: "retencao-liquido-fase-lutea",
        title: "Retenção de Líquido na Fase Lútea: Afeta os Resultados?",
        subtitle: "Não entre em pânico com a balança. Leia isso antes.",
        paragraphs: [
            "Na fase Lútea, a progesterona elevada causa retenção hídrica que pode adicionar de 1 a 3kg de peso corporal. Isso NÃO é gordura. É água extracelular acumulada nos tecidos. A maioria das mulheres pesa mais na semana pré-menstrual e interpreta isso como 'ganho de gordura', gerando frustração, dietas restritivas de emergência e até abandono do treino.",
            "A retenção hídrica afeta visualmente os resultados — músculos parecem menos definidos, o abdômen fica mais inchado e a pele parece mais 'fofa'. Mas debaixo dessa camada de água, o tecido muscular pode estar evoluindo normalmente se o treino e a nutrição estiverem corretos. O erro é usar apenas a balança como métrica de progresso.",
            "Dica prática: compare seu peso sempre na MESMA fase do ciclo (idealmente dia 6-8, pós-menstrual). Isso elimina a variável hídrica e mostra sua evolução real de composição corporal. Beber mais água (não menos) e reduzir sódio processado nos dias de maior retenção também ajuda a estabilizar."
        ],
        cta: "O Artemis compara seu peso filtrado por fase do ciclo. Você vê evolução real, não flutuação hídrica.",
        keywords: ["retenção de líquido fase lútea", "inchaço pré menstrual treino", "peso ciclo menstrual"]
    }
];
