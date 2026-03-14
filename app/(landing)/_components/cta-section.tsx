"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

const CTASection = () => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-violet-600 to-purple-700" />

            {/* Mesh pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Content */}
            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 mb-6 backdrop-blur-sm">
                  <Sparkles className="size-3.5 text-white" />
                  <span className="text-xs font-medium text-white/90">
                    Start for free
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
                  Ready to design your
                  <br />
                  next app?
                </h2>
                <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                  Join thousands of creators who are already using AI to bring
                  their app ideas to life. No credit card required.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {user ? (
                    <></>
                  ) : (
                    <LoginLink>
                      <Button
                        size="lg"
                        className="rounded-full px-8 gap-2 text-base font-semibold bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20"
                      >
                        Start Designing Free
                        <ArrowRight className="size-4" />
                      </Button>
                    </LoginLink>
                  )}
                </div>

                {/* Social proof */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["from-violet-400 to-purple-500", "from-blue-400 to-cyan-500", "from-emerald-400 to-green-500", "from-amber-400 to-orange-500"].map(
                        (color, i) => (
                          <div
                            key={i}
                            className={`w-7 h-7 rounded-full bg-gradient-to-br ${color} border-2 border-white/20`}
                          />
                        )
                      )}
                    </div>
                    <span>2,000+ creators</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/20" />
                  <span>No credit card required</span>
                  <div className="hidden sm:block w-px h-4 bg-white/20" />
                  <span>Free plan available</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
