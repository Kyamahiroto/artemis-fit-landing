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

export const Cookies = () => (
    <LegalLayout title="Política de Cookies">
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
