import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { SEOHead } from './SEOHead';

interface LegalLayoutProps {
    title: string;
    description: string;
    canonicalUrl: string;
    children: React.ReactNode;
}

export const LegalLayout = ({ title, description, canonicalUrl, children }: LegalLayoutProps) => (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark">
        <SEOHead
            title={`${title} | Artemis Fit`}
            description={description}
            canonicalUrl={canonicalUrl}
        />
        
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
