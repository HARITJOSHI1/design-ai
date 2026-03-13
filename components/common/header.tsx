"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { Button } from "../ui/button";
import { LogOutIcon, MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { user } = useKindeBrowserClient();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
                      "rounded-full p-0.5 hover:ring-2 hover:ring-primary/30"
                    )}
                    aria-label="Account menu"
                  >
                    <Avatar className="h-8 w-8 transition hover:ring-primary">
                      <AvatarImage
                        src={user?.picture || ""}
                        alt={user?.given_name || ""}
                        className="object-cover h-8 w-8 rounded-full"
                      />
                      <AvatarFallback className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-violet-600 text-primary-foreground font-bold text-xs flex items-center justify-center">
                        {user?.given_name?.charAt(0)}
                        {user?.family_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 rounded-xl shadow-xl border bg-popover px-3 py-2 animate-fade-in"
                  align="end"
                >
                  <div className="flex items-center gap-3 px-2 py-2 border-b mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.picture || ""}
                        alt={user?.given_name || ""}
                        className="object-cover rounded-full h-10 w-10"
                      />
                      <AvatarFallback className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-violet-600 text-primary-foreground font-bold text-sm flex items-center justify-center">
                        {user?.given_name?.charAt(0)}
                        {user?.family_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {user?.given_name} {user?.family_name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuLabel className="text-xs text-muted-foreground mb-1 px-2">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutLink className="w-full flex items-center gap-2 px-2 py-2 hover:bg-accent rounded-lg transition text-sm">
                      <LogOutIcon className="size-4 text-primary" />
                      <span className="font-medium text-foreground">
                        Logout
                      </span>
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginLink>
                <Button size="sm" className="rounded-full px-5 text-sm font-medium">
                  Sign in
                </Button>
              </LoginLink>
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
