"use client";

import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ArrowRight, MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Logo from "./logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const { user } = useUser()
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <div className="top-0 right-0 left-0 fixed z-100">
      <header
        className={cn(
          "h-16 py-4 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b shadow-sm"
            : "bg-background/50 backdrop-blur-sm border-b border-transparent"
        )}
      >
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="relative rounded-full h-8 w-8"
              size="icon"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {mounted && (
                <>
                  <SunIcon
                    className={cn(
                      "absolute h-4 w-4 transition",
                      isDark ? "scale-100" : "scale-0"
                    )}
                  />
                  <MoonIcon
                    className={cn(
                      "absolute h-4 w-4 transition",
                      isDark ? "scale-0" : "scale-100"
                    )}
                  />
                </>
              )}
            </Button>

            {user ? (
              <UserButton
                appearance={{
                  baseTheme:
                    mounted && (
                      resolvedTheme === "dark" ||
                      resolvedTheme === "system" ||
                      resolvedTheme === undefined
                    )
                      ? dark
                      : undefined,
                }}
              />
            ) : (
              <SignInButton>
                <Button
                  size="lg"
                  className="rounded-full px-4 gap-2 text-sm font-semibold bg-primary text-secondary hover:bg-primary/90 cursor-pointer"
                >
                  Sign in
                  <ArrowRight className="size-4" />
                </Button>
              </SignInButton>

            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className="size-4" />
              ) : (
                <MenuIcon className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b shadow-lg">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
