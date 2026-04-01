import React from 'react';
import { ArrowLeft } from 'lucide-react';

const LegalLayout = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark">
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 bg-dark/80 backdrop-blur-md border-b border-white/5 md:px-12 flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                <ArrowLeft size={16} /> Voltar
            </a>
            <img src="/logo.png" alt="Artemis Fit Logo" className="h-10 w-auto" />
        </nav>

        <main className="max-w-4xl mx-auto pt-40 pb-32 px-6">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-12 tracking-tight">
                {title}<span className="text-primary">.</span>
            </h1>
            <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-white/60 prose-li:text-white/60 prose-strong:text-white leading-relaxed">
                {children}
            </div>
        </main>

        <footer className="py-12 border-t border-white/5 text-center text-[10px] text-white/20 font-bold uppercase tracking-widest">
            © 2026 Artemis Fit. Todos os direitos reservados.
        </footer>
    </div>
);

export const Privacy = () => (
    <LegalLayout title="Política de Privacidade">
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
