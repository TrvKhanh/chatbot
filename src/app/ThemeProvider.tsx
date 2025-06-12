"use client";
import React, { useEffect, useState, createContext } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (t: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === "dark" || (!saved && systemDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleSetTheme = (t: string) => {
    setTheme(t as "light" | "dark");
    if (t === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme: theme || "light", setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 