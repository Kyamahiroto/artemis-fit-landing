import React from 'react';
import { LegalLayout } from './components/LegalLayout';

export const Privacy = () => (
    <LegalLayout 
        title="Política de Privacidade"
        description="Esta política detalha como coletamos, usamos e protegemos as suas informações ao utilizar o nosso sistema de performance feminina inteligente."
        canonicalUrl="https://artemisfit.online/privacidade"
    >
        <p>A sua privacidade é uma prioridade para a Artemis Fit. Esta política detalha como coletamos, usamos e protegemos as suas informações ao utilizar o nosso sistema de performance feminina inteligente.</p>

        <h2>1. Coleta de Informações</h2>
        <p>Coletamos informações que você nos fornece diretamente, como nome, e-mail e dados biométricos necessários para o funcionamento da nossa IA, incluindo idade, peso, rotina de treinos e informações sobre o seu ciclo menstrual.</p>

        <h2>2. Uso dos Dados</h2>
        <p>Os seus dados são utilizados exclusivamente para:</p>
        <ul>
            <li>Personalizar as recomendações de treino e nutrição da IA Artemis.</li>
            <li>Melhorar a acurácia dos nossos algoritmos de bio-sincronização.</li>
            <li>Garantir a segurança e integridade da sua conta.</li>
        </ul>

        <h2>3. Segurança</h2>
        <p>Implementamos medidas de segurança de ponta para proteger os seus dados contra acesso não autorizado, alteração ou destruição. Todas as informações biométricas são criptografadas.</p>

        <h2>4. Compartilhamento de Terceiros</h2>
        <p>Não vendemos nem alugamos os seus dados pessoais a terceiros. Podemos compartilhar dados anônimos e agregados para fins de pesquisa científica sobre performance feminina, sem nunca identificar individualmente as usuárias.</p>

        <h2>5. Seus Direitos (LGPD)</h2>
        <p>Conforme a Lei Geral de Proteção de Dados (LGPD), você tem o direito de solicitar o acesso, retificação ou exclusão permanente dos seus dados a qualquer momento através das configurações da nossa plataforma.</p>
    </LegalLayout>
);
