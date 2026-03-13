"use client";

import AIPromptInput from "@/components/ai/ai-prompt-input";
import React, { useState } from "react";
import { Libre_Baskerville } from "next/font/google";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { suggestions } from "@/lib/constants/suggestions";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useCreateProject } from "@/hooks/project/use-project";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "400"],
});

const HeroSection = () => {
  const { user } = useKindeBrowserClient();
  const [promptText, setPromptText] = useState("");
  const { mutate, isPending } = useCreateProject();

  const handleSuggestionClick = (value: string) => {
    setPromptText(value);
  };

  const handleSubmit = () => {
    if (!promptText) return;
    mutate(promptText);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-32 md:pb-44">
      <Spotlight />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-8 px-4 sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              AI-Powered Design Tool
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-center font-semibold text-5xl tracking-tight sm:text-6xl lg:text-7xl">
            Design mobile apps <br className="md:hidden" />
            <span className={`text-primary italic! ${libreBaskerville.className}`}>
              in minutes
            </span>
          </h1>
          <div className="mx-auto max-w-2xl">
            <p className="text-center text-lg text-muted-foreground leading-relaxed sm:text-xl">
              Go from idea to beautiful app mockups in minutes. Simply describe
              your vision and let AI craft stunning, pixel-perfect designs.
            </p>
          </div>
        </motion.div>

        {/* CTA for non-logged-in users */}
        {!user && (
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <LoginLink>
              <Button size="lg" className="rounded-full px-8 gap-2 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Start Designing Free
                <ArrowRight className="size-4" />
              </Button>
            </LoginLink>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                See How It Works
              </Button>
            </a>
          </motion.div>
        )}

        {/* Prompt Input for logged-in users */}
        {user && (
          <motion.div
            className="flex w-full max-w-3xl flex-col items-center gap-8 relative z-50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full">
              <AIPromptInput
                className="ring-2 ring-primary rounded-3xl"
                promptText={promptText}
                setPromptText={setPromptText}
                isLoading={isPending}
                onSubmit={handleSubmit}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2 px-5">
              <Suggestions>
                {suggestions.map((s) => (
                  <Suggestion
                    key={s.label}
                    suggestion={s.label}
                    className="text-xs! h-7! px-2.5 pt-1!"
                    onClick={() => handleSuggestionClick(s.value)}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </Suggestion>
                ))}
              </Suggestions>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative bottom sphere */}
      <div className="absolute -translate-x-1/2 left-1/2 w-[5000px] h-[3000px] top-[80%] -z-10">
        <div className="-translate-x-1/2 absolute bottom-[calc(100%-300px)] left-1/2 h-[2000px] w-[2000px] opacity-20 bg-radial-primary" />
        <div className="absolute -mt-2.5 size-full rounded-[50%] bg-primary/20 opacity-70 [box-shadow:0_-15px_24.8px_var(--primary)]" />
        <div className="absolute z-0 size-full rounded-[50%] bg-background" />
      </div>
    </section>
  );
};

export default HeroSection;
