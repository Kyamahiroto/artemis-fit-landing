import React from 'react';
import { LegalLayout } from './components/LegalLayout';

export const Terms = () => (
    <LegalLayout 
        title="Termos de Uso"
        description="Ao utilizar a Artemis Fit, você concorda com os seguintes termos. Por favor, leia com atenção."
        canonicalUrl="https://artemisfit.online/termos"
    >
        <p>Ao utilizar a Artemis Fit, você concorda com os seguintes termos. Por favor, leia com atenção.</p>

        <h2>1. Uso da Plataforma</h2>
        <p>O Artemis Fit é um sistema de suporte à performance física exclusiva para mulheres. O seu uso é estritamente pessoal e intransferível.</p>

        <h2>2. Isenção de Responsabilidade Médica</h2>
        <p><strong>A Artemis Fit NÃO é um consultório médico.</strong> As recomendações da nossa IA baseiam-se em algoritmos de performance e não devem, sob hipótese alguma, substituir orientações de médicos, profissionais de saúde ou nutricionistas.</p>
        <p>Sempre consulte um médico antes de iniciar novos protocolos de treinos intensos ou regimes alimentares.</p>

        <h2>3. Bio-Feedback e Sintomas</h2>
        <p>Você é responsável pela precisão dos sintomas e dados biológicos inseridos. A IA Artemis adapta as recomendações com base no que você relata. Relatos imprecisos podem comprometer a eficácia e segurança das sugestões.</p>

        <h2>4. Alterações nos Termos</h2>
        <p>Reservamo-nos o direito de atualizar estes termos à medida que o sistema evolui na fase beta. Manteremos as usuárias informadas sobre alterações significativas.</p>

        <h2>5. Cancelamento e Acesso</h2>
        <p>Na fase beta, o acesso pode ser interrompido ou alterado periodicamente para fins de testes técnicos e evolução do sistema.</p>
    </LegalLayout>
);
