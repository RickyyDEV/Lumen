"use client";

import LumenLogo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { authClient } from "../client";
import { redirect } from "next/navigation";
import Orb from "./components/Orb";
import TypingWord from "./components/TypingAnimation";

export default function Login() {
  const user = authClient.useSession()
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleGoogleLogin = async() => {
    setClicked(true);
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
    setClicked(false);
  };
  if(user.isPending) return <></>
  if(user.data?.session && !user.isPending) {
    redirect("/dashboard")
  }
  return (
    <div className="relative border-2 flex min-h-screen items-center justify-center bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] overflow-hidden" 
 >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.025]" 
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating orbs */}
        <Orb size={400} x="10%" y="20%" delay={0} color="accent" />
        <Orb size={300} x="70%" y="60%" delay={2} color="glow" />
        <Orb size={200} x="80%" y="15%" delay={4} color="accent" />
        <Orb size={250} x="20%" y="75%" delay={1} color="glow" />
        <Orb size={150} x="50%" y="10%" delay={3} color="accent" />
      </div>

      {/* Morphing blob behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="absolute w-125 h-125 opacity-20 pointer-events-none"
            style={{
              background: "conic-gradient(from 0deg, hsl(var(--lumen-accent)), hsl(var(--lumen-glow)), hsl(var(--lumen-accent)))",
              filter: "blur(80px)",
            }}
            animate={{
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "70% 30% 30% 70% / 70% 70% 30% 30%",
                "50% 50% 30% 70% / 60% 40% 60% 40%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
      </div>


      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-md flex-col items-center"
      >
        {/* Glass card */}
        <div className="relative w-full rounded-3xl border border-border/30 bg-background/40 p-10 backdrop-blur-2xl shadow-[0_20px_80px_-20px_hsl(var(--lumen-accent)/0.2)]">
          {/* Inner glow border */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-[hsl(var(--lumen-accent)/0.1)] to-transparent pointer-events-none" />

          {/* Shine sweep effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
            initial={false}
          >
            <motion.div
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, hsl(var(--lumen-accent) / 0.06) 10%, transparent 20%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <LumenLogo size="lg" />
            </motion.div>

            {/* Typing headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Ilumine seus PDFs com
              </h1>
              <div className="mt-1 text-2xl font-bold sm:text-3xl h-10">
                <TypingWord />
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 text-center text-sm text-muted-foreground max-w-xs leading-relaxed"
            >
              Acesse sua conta e transforme qualquer documento em conhecimento prático em segundos.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="my-8 h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
            />

            {/* Google Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={handleGoogleLogin}
              disabled={clicked}
              className="group relative w-full overflow-hidden rounded-2xl border border-border/50 bg-background/70 px-6 py-4 backdrop-blur-sm transition-all duration-500 hover:border-[hsl(var(--lumen-accent)/0.4)] hover:shadow-[0_0_40px_-10px_hsl(var(--lumen-accent)/0.3)] disabled:opacity-70"
            >
              {/* Button background glow on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-linear-to-r from-[hsl(var(--lumen-accent)/0.05)] to-[hsl(var(--lumen-glow)/0.05)]"
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 flex items-center justify-center gap-3">
                {clicked ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="size-5 rounded-full border-2 border-muted-foreground border-t-[hsl(var(--lumen-accent))]"
                  />
                ) : (
                    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                )}
                <span className="text-sm font-semibold text-foreground">
                  {clicked ? "Conectando..." : "Continuar com Google"}
                </span>
              </div>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[hsl(var(--lumen-accent)/0.08)] to-transparent pointer-events-none"
                animate={isHovered ? { translateX: ["−100%", "100%"] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
              />
            </motion.button>

            {/* Terms */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-6 text-center text-[11px] text-muted-foreground/60 leading-relaxed max-w-xs"
            >
              Ao continuar, você concorda com os{" "}
              <a href="#" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">
                Termos de Uso
              </a>{" "}
              e a{" "}
              <a href="#" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">
                Política de Privacidade
              </a>
              .
            </motion.p>
          </div>
        </div>

        {/* Back to home */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-6 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors underline underline-offset-2"
        >
          ← Voltar para o início
        </motion.a>
      </motion.div>
    </div>
  );
};

