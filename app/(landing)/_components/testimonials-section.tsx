"use client";

import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    avatar: "SC",
    avatarColor: "from-violet-500 to-purple-600",
    content:
      "This is a game-changer. I went from a napkin sketch to a professional app mockup in under 5 minutes. My investors were blown away.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    avatar: "MJ",
    avatarColor: "from-blue-500 to-cyan-500",
    content:
      "We use Xdesign.ai for rapid prototyping before committing to development. It saves us weeks of back-and-forth with design teams.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "UX Designer",
    avatar: "PP",
    avatarColor: "from-emerald-500 to-green-500",
    content:
      "As a designer, I was skeptical. But the AI understands modern UI patterns surprisingly well. It's now part of my ideation workflow.",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "Freelance Developer",
    avatar: "AR",
    avatarColor: "from-amber-500 to-orange-500",
    content:
      "I can now show clients realistic mockups during our first meeting. It's completely changed how I pitch projects and win contracts.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Design Agency CEO",
    avatar: "EW",
    avatarColor: "from-pink-500 to-rose-500",
    content:
      "The quality of AI-generated designs keeps improving. We use it to quickly explore different visual directions before diving deep.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Mobile Developer",
    avatar: "DK",
    avatarColor: "from-indigo-500 to-violet-500",
    content:
      "Finally, a tool that bridges the gap between ideas and implementation. The generated designs are realistic and implementable.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-mesh-3" />
        <div className="absolute inset-0 bg-dotted-grid-sm opacity-25" style={{ maskImage: 'radial-gradient(ellipse 80% 50% at 50% 60%, black 20%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Loved by <span className="text-primary">creators</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what designers, developers, and founders are saying about
            Xdesign.ai.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="h-full rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/90 text-sm leading-relaxed mb-5">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
