"use client";

import React from "react";
import Header from "@/components/common/header";
import HeroSection from "./_components/hero-section";
import StatsSection from "./_components/stats-section";
import FeaturesSection from "./_components/features-section";
import HowItWorksSection from "./_components/how-it-works-section";
import ShowcaseSection from "./_components/showcase-section";
import TestimonialsSection from "./_components/testimonials-section";
import PricingSection from "./_components/pricing-section";
import FAQSection from "./_components/faq-section";
import CTASection from "./_components/cta-section";
import FooterSection from "./_components/footer-section";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useGetProjects } from "@/hooks/project/use-project";
import { ProjectType } from "@/lib/types/t.project";
import ProjectCard from "./_components/project-card";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "motion/react";

const Page = () => {
  const { user } = useKindeBrowserClient();
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjects(user?.id);

  return (
    <div className="w-full min-h-screen">
      <Header />

      {/* Hero */}
      <HeroSection />

      {/* Recent Projects (for logged-in users) */}
      {user?.id && (
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-xl tracking-tight">
                  Recent Projects
                </h2>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Spinner className="size-10" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {projects?.map((project: ProjectType) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}

              {isError && (
                <p className="text-red-500 text-sm">Failed to load projects</p>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats */}
      <StatsSection />

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Showcase */}
      <ShowcaseSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing */}
      {/* <PricingSection /> */}

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default Page;
