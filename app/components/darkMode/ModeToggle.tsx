"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { JSX, useEffect, useState } from "react";

export function ModeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkModeVisual, setIsDarkModeVisual] = useState(false);

  useEffect(() => {
    if (theme) {
      setIsDarkModeVisual(theme === "dark");
      setMounted(true);
    }
  }, [theme]);

  const handleThemeChange = (): void => {
    const newVisual = !isDarkModeVisual;
    setIsDarkModeVisual(newVisual);

    setTimeout(() => {
      setTheme(newVisual ? "dark" : "light");
    }, 100);
  };

  if (!mounted) {
    return (
      <button className="h-8 w-8" aria-label="Toggle theme">
        <Sun className="opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeChange}
      aria-label="Toggle theme"
      className="relative h-6 w-6"
    >
      <div className="relative h-full w-full cursor-pointer">
        <Sun
          stroke="oklch(79.5% 0.184 86.047)"
          size={26}
          strokeWidth={1}
          fill="oklch(79.5% 0.184 86.047)"
          className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
            isDarkModeVisual
              ? "pointer-events-none -translate-y-7 scale-75 opacity-0"
              : "translate-y-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          stroke="oklch(55.1% 0.027 264.364)"
          fill="oklch(55.1% 0.027 264.364)"
          size={26}
          className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
            isDarkModeVisual
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-7 scale-75 opacity-0"
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
