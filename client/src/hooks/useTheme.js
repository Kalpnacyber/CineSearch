import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("cinesearch-theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("cinesearch-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
