"use client";

import React from "react";
import { motion } from "motion/react";
import { MessageSquare, Wand2, Eye } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <MessageSquare className="size-6" />,
    title: "Describe Your Vision",
    description:
      "Simply type what you want your app to look like. Describe screens, features, and style preferences in natural language.",
    color: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/10",
  },
  {
    number: "02",
    icon: <Wand2 className="size-6" />,
    title: "AI Generates Designs",
    description:
      "Our AI engine analyzes your description and generates beautiful, realistic mobile app mockups with proper UI patterns.",
    color: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10",
  },
  {
    number: "03",
    icon: <Eye className="size-6" />,
    title: "Preview & Iterate",
    description:
      "View your designs on realistic device frames, refine with follow-up prompts, and export when you're happy.",
    color: "from-emerald-500 to-green-500",
    bgGlow: "bg-emerald-500/10",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background mesh + dotted grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-mesh-2" />
        <div className="absolute inset-0 bg-dotted-grid-lg opacity-30" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="text-xs font-medium text-primary">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            From idea to design in{" "}
            <span className="text-primary">3 simple steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No design tools to learn. No complicated workflows. Just describe
            and design.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] right-[-40%] h-px">
                  <div className="w-full h-full bg-gradient-to-r from-border via-border/50 to-border border-t border-dashed border-border" />
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 ${step.bgGlow} rounded-full blur-2xl scale-150`} />
                  <div
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold text-foreground">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
