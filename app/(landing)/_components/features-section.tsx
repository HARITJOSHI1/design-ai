"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Zap,
  Layers,
  Smartphone,
  Palette,
  Download,
} from "lucide-react";

const features = [
  {
    icon: <Sparkles className="size-6" />,
    title: "AI-Powered Generation",
    description:
      "Describe your app idea in plain English and watch AI create stunning, production-ready mockups in seconds.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
  },
  {
    icon: <Zap className="size-6" />,
    title: "Instant Iterations",
    description:
      "Refine your designs with natural language. Ask for changes and see them applied instantly — no design skills needed.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: <Layers className="size-6" />,
    title: "Multi-Screen Flows",
    description:
      "Generate complete app flows with multiple connected screens. Design entire user journeys in one go.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: <Smartphone className="size-6" />,
    title: "Device Previews",
    description:
      "See your designs on realistic device frames. Preview how your app looks on different phones and tablets.",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
  },
  {
    icon: <Palette className="size-6" />,
    title: "Design System Ready",
    description:
      "Every generated design follows modern UI patterns with consistent typography, spacing, and color palettes.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
  },
  {
    icon: <Download className="size-6" />,
    title: "Export & Share",
    description:
      "Download high-quality screenshots of your designs. Share them with your team or stakeholders effortlessly.",
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-500",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh-1 pointer-events-none" />
      {/* Dotted grid with edge fade */}
      <div className="absolute inset-0 bg-dotted-grid opacity-40 pointer-events-none" style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 75%)' }} />

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
            <span className="text-xs font-medium text-primary">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Everything you need to{" "}
            <span className="text-primary">design faster</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful AI tools that transform your ideas into beautiful mobile app
            designs — no experience required.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative h-full rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 ${feature.iconColor} transition-transform group-hover:scale-110`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
