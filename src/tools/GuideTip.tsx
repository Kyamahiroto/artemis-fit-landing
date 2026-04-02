import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Zap, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { guideTips } from '../data/guideTipsData';
import { SEOHead } from '../components/SEOHead';

export const GuideTip = () => {
    const { slug } = useParams<{ slug: string }>();
    const tip = guideTips.find(t => t.slug === slug);

    if (!tip) {
        return (
            <div className="min-h-screen bg-dark text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Dica não encontrada</h1>
                    <Link to="/guia" className="text-primary underline">Voltar ao Guia Artemis</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-dark pb-32">
            <SEOHead
                title={`${tip.title} | Artemis Fit`}
                description={tip.paragraphs[0].substring(0, 155) + '...'}
            />

            <nav className="px-6 py-5 bg-dark/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
                <Link to="/guia" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Guia Artemis
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 border border-primary/20 px-3 py-1 rounded-full">
                    <BookOpen size={12} /> Dica Científica
                </div>
            </nav>

            <article className="max-w-2xl mx-auto pt-16 px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-white/30 mb-8 font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/guia" className="hover:text-primary transition-colors">Guia Artemis</Link>
                        <span>/</span>
                        <span className="text-white/50">Dica</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 leading-tight">{tip.title}</h1>
                    <p className="text-primary font-medium text-lg mb-10 italic">{tip.subtitle}</p>

                    <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                        {tip.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    {/* Keywords tags */}
                    <div className="flex flex-wrap gap-2 mt-10 mb-16">
                        {tip.keywords.map((kw, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/40">
                                {kw}
                            </span>
                        ))}
                    </div>

                    {/* CTA Block */}
                    <div className="p-8 bg-primary/5 border border-primary/20 rounded-[2rem] text-center">
                        <h2 className="text-2xl font-bold mb-4 font-display">{tip.cta}</h2>
                        <a href="https://app.artemisfit.online" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-dark rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(205,255,0,0.4)]">
                            <Zap size={18} /> Conhecer o Artemis Fit
                        </a>
                    </div>

                    {/* Related tips */}
                    <div className="mt-16">
                        <h3 className="text-lg font-bold mb-6 text-white/50">Leia também</h3>
                        <div className="space-y-3">
                            {guideTips.filter(t => t.slug !== slug).slice(0, 3).map(t => (
                                <Link key={t.slug} to={`/guia/dicas/${t.slug}`} className="block p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-primary/30 transition-all group">
                                    <div className="font-bold group-hover:text-primary transition-colors">{t.title}</div>
                                    <div className="text-sm text-white/40 mt-1">{t.subtitle}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </article>

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": tip.title,
                        "description": tip.paragraphs[0].substring(0, 155),
                        "author": { "@type": "Organization", "name": "Artemis Fit" },
                        "publisher": { "@type": "Organization", "name": "Artemis Fit" },
                        "mainEntityOfPage": `https://artemisfit.online/guia/dicas/${tip.slug}`
                    })
                }}
            />
        </div>
    );
};
