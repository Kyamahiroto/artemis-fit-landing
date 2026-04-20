import React, { useState } from 'react';
import { Lock, Unlock, Mail, Sparkles, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLeadCapture } from '../hooks/useLeadCapture';

interface EmailGateProps {
  toolName: string;
  toolResults?: Record<string, unknown>;
  /** What the user sees above the gate as a "preview" */
  previewContent: React.ReactNode;
  /** Full detailed results shown after unlock */
  children: React.ReactNode;
}

export const EmailGate: React.FC<EmailGateProps> = ({
  toolName,
  toolResults,
  previewContent,
  children,
}) => {
  const { isUnlocked, isLoading, captureLead } = useLeadCapture();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [acceptComms, setAcceptComms] = useState(true);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || isLoading) return;

    await captureLead({
      email,
      name: name || undefined,
      sourceTool: toolName,
      toolResults,
    });

    setShowUnlockAnimation(true);
    setTimeout(() => {
      setShowUnlockAnimation(false);
      setJustUnlocked(true);
    }, 1800);
  };

  return (
    <div>
      {/* Preview Content - Always visible */}
      {previewContent}

      <AnimatePresence mode="wait">
        {/* UNLOCK ANIMATION */}
        {showUnlockAnimation && (
          <motion.div
            key="unlock-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.div
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.8 }}
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
            >
              <Unlock size={36} className="text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold font-display mb-2">Desbloqueado! 🎉</h3>
              <p className="text-white/50 text-sm">
                Enviamos o <span className="text-primary font-bold">Guia Artemis</span> para o seu e-mail!
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* EMAIL GATE FORM - shown when NOT unlocked */}
        {!isUnlocked && !showUnlockAnimation && (
          <motion.div
            key="email-gate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="my-8"
          >
            {/* Gate Card */}
            <div className="relative rounded-[2rem] overflow-hidden">
              {/* Glassmorphism background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark-surface to-primary/5 backdrop-blur-xl" />
              <div className="absolute inset-0 border border-primary/20 rounded-[2rem]" />

              <div className="relative p-8 md:p-10">
                {/* Icon + Badge */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lock size={20} className="text-primary" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold font-display text-center mb-3">
                  Desbloqueie o <span className="text-primary italic">resultado completo</span>
                </h3>
                <p className="text-white/50 text-center text-sm max-w-md mx-auto mb-8">
                  Receba a análise detalhada + o <strong className="text-white">Guia Interativo Artemis</strong> com tudo sobre treino e ciclo menstrual no seu e-mail.
                </p>

                {/* What you get */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-lg mx-auto">
                  {[
                    { icon: <CheckCircle2 size={14} />, text: 'Resultado detalhado com recomendações' },
                    { icon: <BookOpen size={14} />, text: 'Guia interativo completo e gratuito' },
                    { icon: <Sparkles size={14} />, text: 'Quiz personalizado de perfil' },
                    { icon: <Mail size={14} />, text: 'Dicas exclusivas por e-mail' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                      <span className="text-primary shrink-0">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                  <div>
                    <input
                      type="text"
                      placeholder="Seu primeiro nome (opcional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-dark/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/25"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-dark/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/25"
                    />
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={acceptComms}
                      onChange={(e) => setAcceptComms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-dark accent-primary"
                    />
                    <span className="text-[11px] text-white/30 leading-snug group-hover:text-white/50 transition-colors">
                      Aceito receber dicas e novidades do Artemis Fit. Você pode cancelar quando quiser.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!isValidEmail || isLoading}
                    className="w-full py-4 bg-primary text-dark rounded-full font-bold text-base hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(205,255,0,0.4)] hover:shadow-[0_0_40px_-5px_rgba(205,255,0,0.6)]"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Unlock size={18} />
                        Desbloquear + Receber Guia Gratuito
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-white/20 text-center">
                    Seus dados estão protegidos. Zero spam.
                  </p>
                </form>
              </div>
            </div>

            {/* Blurred preview of locked content */}
            <div className="relative mt-6">
              <div className="blur-[8px] pointer-events-none select-none opacity-40 max-h-[300px] overflow-hidden">
                {children}
              </div>
              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
              {/* Lock overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-dark/80 border border-white/10 rounded-full text-xs font-bold text-white/40">
                  <Lock size={12} /> Conteúdo bloqueado
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL CONTENT - shown when unlocked (either from localStorage or just now) */}
      {(isUnlocked && !showUnlockAnimation) && (
        <motion.div
          initial={justUnlocked ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          {justUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 justify-center mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-bold text-primary mx-auto w-fit"
            >
              <CheckCircle2 size={16} /> Guia enviado para seu e-mail!
            </motion.div>
          )}
          {children}
        </motion.div>
      )}
    </div>
  );
};
