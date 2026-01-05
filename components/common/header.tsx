"use client";

import { useTheme } from "next-themes";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="sticky top-0 right-0 left-0 z-30">
      <header className="h-16 border-b bg-background py-4">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          <Logo />

          <div className="flex-1">
            <Link className="text-foreground-muted text-sm" href="/">
              Home
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center gap-3 md:flex">
            <Button
              variant="outline"
              className="relative rounded-full h-8 w-8"
              size="icon"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {mounted && (
                <>
                  <SunIcon
                    className={cn(
                      "absolute h-5 w-5 transition",
                      isDark ? "scale-100" : "scale-0"
                    )}
                  />
                  <MoonIcon
                    className={cn(
                      "absolute h-5 w-5 transition",
                      isDark ? "scale-0" : "scale-100"
                    )}
                  />
                </>
              )}
            </Button>

            <Button>
              <LoginLink>Sign in</LoginLink>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
