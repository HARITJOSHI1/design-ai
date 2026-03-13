"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Xdesign.ai?",
    answer:
      "Xdesign.ai is an AI-powered design tool that transforms your text descriptions into beautiful, realistic mobile app mockups. Simply describe what you want your app to look like, and our AI generates professional designs in seconds.",
  },
  {
    question: "Do I need design experience to use it?",
    answer:
      "Not at all! Xdesign.ai is built for everyone — from developers and product managers to entrepreneurs with no design background. Just describe your vision in plain English and the AI handles the rest.",
  },
  {
    question: "What types of designs can I create?",
    answer:
      "You can create any type of mobile app design — from fintech dashboards and e-commerce product pages to fitness trackers, food delivery apps, and more. The AI understands modern UI patterns across all categories.",
  },
  {
    question: "Can I iterate on the generated designs?",
    answer:
      "Yes! You can refine your designs by providing additional prompts. Ask for color changes, layout adjustments, or entirely new variations — the AI will iterate based on your feedback.",
  },
  {
    question: "What export formats are supported?",
    answer:
      "Free users can export designs as PNG. Pro and Team plans support high-resolution PNG and SVG exports, perfect for presentations, pitch decks, or handing off to developers.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes! Our free plan lets you create up to 3 projects per month with basic AI generation. It's perfect for trying out the tool and seeing if it fits your workflow.",
  },
  {
    question: "Can I use the designs commercially?",
    answer:
      "Absolutely. All designs generated with Xdesign.ai are yours to use however you like — for client projects, your own apps, presentations, or portfolio pieces.",
  },
];

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    className={cn(
      "border rounded-xl transition-all duration-300",
      isOpen
        ? "border-primary/30 bg-primary/[0.02] shadow-sm"
        : "border-border/60 bg-card/30 hover:border-border"
    )}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left"
    >
      <span className="font-medium text-sm sm:text-base pr-4">
        {faq.question}
      </span>
      <ChevronDown
        className={cn(
          "size-5 text-muted-foreground shrink-0 transition-transform duration-300",
          isOpen && "rotate-180 text-primary"
        )}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 pt-0">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-mesh-2" />
        <div className="absolute inset-0 bg-dotted-grid-sm opacity-20" style={{ maskImage: 'radial-gradient(ellipse 60% 60% at 50% 40%, black 20%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="text-xs font-medium text-primary">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Frequently asked{" "}
            <span className="text-primary">questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to know about Xdesign.ai.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <FAQItem
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
