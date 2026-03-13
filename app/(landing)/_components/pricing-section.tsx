"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out AI-powered design",
    features: [
      "3 projects per month",
      "Basic AI generation",
      "Standard device frames",
      "PNG export",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
    gradient: "",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For designers and developers who ship fast",
    features: [
      "Unlimited projects",
      "Advanced AI generation",
      "All device frames",
      "High-res export (PNG & SVG)",
      "Multi-screen flows",
      "Priority AI processing",
      "Email support",
    ],
    cta: "Start Pro Trial",
    popular: true,
    gradient: "from-primary via-violet-500 to-purple-600",
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    description: "For teams building products together",
    features: [
      "Everything in Pro",
      "5 team members",
      "Shared project library",
      "Brand kit & guidelines",
      "Version history",
      "Design system export",
      "Priority support",
    ],
    cta: "Start Team Trial",
    popular: false,
    gradient: "",
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-mesh-1" />
        <div className="absolute inset-0 bg-dotted-grid opacity-30" style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="text-xs font-medium text-primary">Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Simple, transparent{" "}
            <span className="text-primary">pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Start for free, upgrade when you need more power.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-muted/50 p-1 rounded-full border">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                !isAnnual
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                isAnnual
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <span className="ml-1.5 text-xs text-primary font-semibold">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn("relative", plan.popular && "md:-mt-4 md:mb-[-16px]")}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-violet-500 text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/25">
                    <Sparkles className="size-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "h-full rounded-2xl border p-7 transition-all duration-300",
                  plan.popular
                    ? "border-primary/50 bg-card shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                    : "border-border/60 bg-card/50 hover:border-primary/20 hover:shadow-md"
                )}
              >
                {/* Plan name */}
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price === "$0"
                      ? "$0"
                      : isAnnual
                      ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                      : plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{plan.period === "forever" ? "forever" : isAnnual ? "mo, billed annually" : "month"}
                  </span>
                </div>

                {/* CTA */}
                <LoginLink>
                  <Button
                    className={cn(
                      "w-full rounded-xl mb-6",
                      plan.popular
                        ? "shadow-lg shadow-primary/20"
                        : ""
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </LoginLink>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="mt-0.5">
                        <Check className="size-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
