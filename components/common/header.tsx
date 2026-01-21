"use client";

import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
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

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="top-0 right-0 left-0 fixed z-50">
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
                      "rounded-full p-1 drop-shadow-sm hover:ring-2 hover:ring-primary/30"
                    )}
                    aria-label="Account menu"
                  >
                    <Avatar className="h-10 w-10 transition hover:ring-primary">
                      <AvatarImage
                        src={user?.picture || ""}
                        alt={user?.given_name || ""}
                        className="object-cover h-8 w-8 rounded-full"
                      />
                      <AvatarFallback className="rounded-lg bg-muted text-primary font-bold">
                        {user?.given_name?.charAt(0)}
                        {user?.family_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 rounded-lg shadow-xl border bg-popover px-3 py-2 animate-fade-in"
                  align="end"
                >
                  <div className="flex items-center gap-3 px-2 py-2 border-b mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.picture || ""}
                        alt={user?.given_name || ""}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg bg-muted text-primary font-bold">
                        {user?.given_name?.charAt(0)}
                        {user?.family_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        {user?.given_name} {user?.family_name}
                      </div>
                      <div className="text-xs text-foreground-muted truncate">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuLabel className="text-[.95rem] text-foreground-muted mb-1">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutLink className="w-full flex items-center gap-2 px-1 py-2 hover:bg-accent rounded-md transition">
                      <LogOutIcon className="size-4 mr-2 text-primary" />
                      <span className="font-medium text-foreground">
                        Logout
                      </span>
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginLink>
                <Button>Sign in</Button>
              </LoginLink>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
