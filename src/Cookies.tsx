import React from 'react';
import { LegalLayout } from './components/LegalLayout';

export const Cookies = () => (
    <LegalLayout 
        title="Política de Cookies"
        description="Utilizamos cookies para oferecer a melhor experiência personalizada na nossa plataforma de performance feminina."
        canonicalUrl="https://artemisfit.online/cookies"
    >
        <p>Utilizamos cookies para oferecer a melhor experiência personalizada na nossa plataforma de performance feminina.</p>

        <h2>1. O que são Cookies?</h2>
        <p>Os cookies são pequenos arquivos de texto enviados ao seu navegador. Eles nos ajudam a lembrar das suas preferências e a entender a sua interação com o nosso sistema de biossincronização.</p>

        <h2>2. Cookies Essenciais</h2>
        <p>São estritamente necessários para o funcionamento e segurança da plataforma. Sem eles, as funções de login e integridade de dados podem ser comprometidas.</p>

        <h2>3. Cookies de Performance</h2>
        <p>Utilizamos cookies analíticos (como do nosso próprio sistema de IA) para entender como as usuárias navegam no app e onde podemos melhorar os tempos de resposta dos treinos.</p>

        <h2>4. Cookies de Terceiros</h2>
        <p>Podemos utilizar serviços analíticos de terceiros (como Vercel Analytics ou equivalentes) para obter dados agregados de uso, que são mantidos de forma anônima.</p>

        <h2>5. Como Controlar os Cookies</h2>
        <p>Você pode configurar o seu navegador para recusar cookies. No entanto, lembre-se de que muitas funcionalidades cruciais da Artemis Fit podem não funcionar corretamente sem eles.</p>
    </LegalLayout>
);
