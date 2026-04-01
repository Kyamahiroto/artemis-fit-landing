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

export const Terms = () => (
    <LegalLayout title="Termos de Uso">
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
