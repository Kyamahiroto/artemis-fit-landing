import React, { useState } from 'react';
import { Lock, Unlock, Mail, Sparkles, ArrowRight, CheckCircle2, BookOpen, Gift, ShieldCheck, Zap } from 'lucide-react';
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
    <div className="w-full">
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
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <motion.div
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: [1, 1.4, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.8 }}
              className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(205,255,0,0.2)]"
            >
              <Unlock size={42} className="text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-3xl font-bold font-display mb-3">Acesso Liberado! ✨</h3>
              <p className="text-white/50 text-base max-w-xs mx-auto">
                Seu resultado está pronto e o <span className="text-primary font-bold">Guia Exclusivo</span> está voando para seu e-mail.
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
            className="relative -mt-12 z-10"
          >
            {/* Gate Card */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-primary/20">
              {/* Complex background */}
              <div className="absolute inset-0 bg-[#0c0c0c]" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -ml-32 -mb-32" />

              <div className="relative p-8 md:p-12">
                {/* Top Badge */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
                    <Sparkles size={12} /> Recurso Exclusivo
                  </div>
                </div>

                <div className="text-center mb-10">
                  <h3 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
                    Veja sua <span className="text-primary italic">Análise Deep</span> + Bônus Gratuito
                  </h3>
                  <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
                    Desbloqueie o resultado completo e receba o <strong className="text-white">Guia Artemis (PDF Interativo)</strong> com bio-hacks para seu treino de acordo com seu ciclo.
                  </p>
                </div>

                {/* Value Propositions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Gift size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">Guia Inédito</h4>
                      <p className="text-[10px] text-white/40 leading-snug">Conteúdo que as blogueiras não ensinam sobre fisiologia.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">Resultado RAW</h4>
                      <p className="text-[10px] text-white/40 leading-snug">Dados brutos e recomendações sem filtros para você aplicar hoje.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">Antispam</h4>
                      <p className="text-[10px] text-white/40 leading-snug">Odiamos spam tanto quanto você. Seus dados estão seguros.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">Suporte VIP</h4>
                      <p className="text-[10px] text-white/40 leading-snug">Acesso a novas ferramentas gratuitas antes de todo mundo.</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="E-mail principal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group mt-4 px-2">
                    <div className="relative flex items-center mt-1">
                      <input
                        type="checkbox"
                        checked={acceptComms}
                        onChange={(e) => setAcceptComms(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-dark accent-primary cursor-pointer"
                      />
                    </div>
                    <span className="text-[10px] text-white/30 leading-snug group-hover:text-white/50 transition-colors">
                      Aceito receber dicas de bio-hack e novidades do Artemis Fit. Prometo que será útil ou você sai com um clique.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!isValidEmail || isLoading}
                    className="w-full py-5 bg-primary text-dark rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(205,255,0,0.5)] hover:shadow-[0_0_50px_-5px_rgba(205,255,0,0.6)]"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-dark/30 border-t-dark rounded-full animate-spin" />
                        Validando...
                      </>
                    ) : (
                      <>
                        <Unlock size={20} />
                        Desbloquear Análise + PDF Grátis
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-primary/40 font-bold uppercase tracking-widest">
                    <ShieldCheck size={12} /> Seus dados estão seguros
                  </div>
                </form>
              </div>
            </div>

            {/* Blurred preview of locked content */}
            <div className="relative mt-8 group">
              <div className="blur-[12px] opacity-20 max-h-[400px] overflow-hidden transition-all duration-700 group-hover:opacity-30">
                {children}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 py-3 bg-dark/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-3">
                  <Lock size={14} className="text-primary" /> Visualização protegida por e-mail
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL CONTENT - shown when unlocked */}
      {(isUnlocked && !showUnlockAnimation) && (
        <motion.div
          initial={justUnlocked ? { opacity: 0, filter: 'blur(10px)' } : false}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="mt-6"
        >
          {justUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 justify-center mb-10 px-6 py-3 bg-primary/10 border border-primary/20 rounded-2xl text-sm font-bold text-primary mx-auto w-fit shadow-[0_0_30px_rgba(205,255,0,0.1)]"
            >
              <CheckCircle2 size={18} /> 
              <span>Tudo certo! O Guia Artemis foi enviado para <b>{email}</b></span>
            </motion.div>
          )}
          {children}
        </motion.div>
      )}
    </div>
  );
};
