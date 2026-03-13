"use client";

import React from "react";
import { motion } from "motion/react";

const showcaseItems = [
  {
    category: "Finance",
    prompt: "Dark themed fintech dashboard with spending analytics",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    emoji: "💸",
  },
  {
    category: "Fitness",
    prompt: "Activity tracker with neon accents and health metrics",
    gradient: "from-emerald-600 via-green-600 to-teal-700",
    emoji: "🔥",
  },
  {
    category: "Food Delivery",
    prompt: "Warm, appetizing food ordering app with vibrant cards",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    emoji: "🍔",
  },
  {
    category: "Travel",
    prompt: "Minimalist luxury travel booking with immersive imagery",
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    emoji: "✈️",
  },
  {
    category: "E-Commerce",
    prompt: "Trendy sneaker product page with bold typography",
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    emoji: "👟",
  },
  {
    category: "Wellness",
    prompt: "Calming meditation app with soft pastel aesthetic",
    gradient: "from-teal-400 via-emerald-500 to-green-600",
    emoji: "🧘",
  },
];

const ShowcaseSection = () => {
  return (
    <section id="showcase" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="text-xs font-medium text-primary">Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Designs that <span className="text-primary">inspire</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore what&apos;s possible with AI-generated mobile app designs
            across different categories.
          </p>
        </motion.div>

        {/* Showcase grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                {/* Gradient preview area */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}
                >
                  {/* Phone mockup silhouette */}
                  <div className="relative w-24 h-44 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                    {/* Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-white/20 rounded-full" />
                    {/* Screen content placeholder lines */}
                    <div className="mt-6 mx-3 space-y-2">
                      <div className="h-1.5 bg-white/25 rounded-full w-full" />
                      <div className="h-1.5 bg-white/20 rounded-full w-3/4" />
                      <div className="h-6 bg-white/15 rounded-lg w-full mt-3" />
                      <div className="h-6 bg-white/10 rounded-lg w-full" />
                      <div className="h-1.5 bg-white/20 rounded-full w-1/2 mt-3" />
                      <div className="h-4 bg-white/15 rounded-md w-full mt-2" />
                    </div>
                  </div>

                  {/* Floating emoji */}
                  <span className="absolute top-4 right-4 text-2xl opacity-80 group-hover:scale-125 transition-transform">
                    {item.emoji}
                  </span>
                </div>

                {/* Card content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{item.prompt}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
