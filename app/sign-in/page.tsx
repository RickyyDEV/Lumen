'use client';

import { motion, TargetAndTransition, Variants } from 'framer-motion';
import { useState } from 'react';
import { Chrome, ArrowRight, Zap } from 'lucide-react';
import { authClient } from '../(auth)/client';

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (err) {
      setError('Falha ao conectar com Google. Tente novamente.');
      setIsLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 },
    },
  };

  const glowPulse: TargetAndTransition = {
    boxShadow: [
      '0 0 0 0 oklch(0.70 0.15 90 / 0)',
      '0 0 0 20px oklch(0.70 0.15 90 / 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-amber-200/20 rounded-full blur-3xl"
        animate={{
          x: [0, 80, -60, 0],
          y: [0, 50, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-tl from-amber-300/20 to-yellow-200/10 rounded-full blur-3xl"
        animate={{
          x: [0, -70, 70, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="400" height="400" filter="url(%23noiseFilter)" /%3E%3C/svg%3E")',
        }}
      />

      {/* Content Container */}
      <div className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Main Card */}
          <motion.div className="relative group">
            {/* Glow Border Effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-300 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Card Glass Container */}
            <div className="relative bg-white/70 backdrop-blur-xl border border-gradient-to-r from-yellow-200/40 via-amber-100/30 to-yellow-200/40 rounded-3xl p-10 sm:p-14 shadow-2xl shadow-yellow-100/20">
              {/* Inner Glow Fill */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/40 via-transparent to-amber-50/20 rounded-3xl pointer-events-none" />

              {/* Content */}
              <div className="relative space-y-8">
                {/* Logo/Icon Section */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center mb-2"
                >
                  <div className="relative">
                    {/* Glow Pulse Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-2xl blur-lg"
                      animate={glowPulse}
                    />

                    {/* Icon Container */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-100 to-amber-50 rounded-2xl flex items-center justify-center border-2 border-yellow-300/50 shadow-lg shadow-yellow-200/50">
                      <Zap className="w-10 h-10 text-yellow-600 drop-shadow-lg" />
                    </div>
                  </div>
                </motion.div>

                {/* Heading */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <h1 className="text-center text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter">
                    Lumen
                  </h1>
                  <p className="text-center text-base font-semibold text-slate-600">
                    Clareza instantânea para decisões críticas
                  </p>
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="text-center text-sm text-slate-600 leading-relaxed"
                >
                  Transforme documentos extensos em insights acionáveis. Powered by AI intelligence.
                </motion.p>

                {/* Google Sign In Button */}
                <motion.button
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="relative w-full group/btn overflow-hidden"
                >
                  {/* Button Glow Background */}
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-xl blur opacity-0 group-hover/btn:opacity-75 transition-all duration-300"
                    animate={{
                      backgroundPosition: ['0% center', '100% center', '0% center'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Button Content */}
                  <motion.div className="relative w-full py-4 px-6 bg-gradient-to-r from-yellow-400 via-yellow-400 to-amber-400 hover:from-yellow-500 hover:via-yellow-500 hover:to-amber-500 text-slate-900 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-3 border border-yellow-500/50 shadow-lg shadow-yellow-300/50 group-hover/btn:shadow-yellow-400/70">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <Chrome className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Chrome className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    )}
                    <span className="text-base font-bold tracking-wide">
                      {isLoading ? 'Conectando...' : 'Conectar com Google'}
                    </span>
                    {!isLoading && (
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <ArrowRight className="w-4 h-4 opacity-70" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.button>

                {/* Error State */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-lg px-4 py-3 text-red-700 text-sm text-center font-medium"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200/50" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white/70 text-slate-500 font-medium">
                      Autenticação segura
                    </span>
                  </div>
                </motion.div>

                {/* Footer Links */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center gap-1 text-xs text-slate-600"
                >
                  <span>By signing in, you agree to our</span>
                  <a
                    href="#"
                    className="text-amber-600 hover:text-amber-700 font-semibold underline transition"
                  >
                    Terms
                  </a>
                  <span>and</span>
                  <a
                    href="#"
                    className="text-amber-600 hover:text-amber-700 font-semibold underline transition"
                  >
                    Privacy
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span>Enterprise-Grade Security</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scan Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
        animate={{
          y: ['0vh', '100vh'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Grid Background Subtle */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
