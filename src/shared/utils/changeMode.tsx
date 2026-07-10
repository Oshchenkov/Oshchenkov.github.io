type ThemeMode = "dark" | "light";
const STORAGE_KEY = "modeType";

export function getInitialMode(): ThemeMode {
  if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
    return localStorage.getItem(STORAGE_KEY) as ThemeMode;
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "dark";
}

export function toggleMode(): void {
  const root = document?.documentElement;
  const isDarkMode = () => {
    return root.classList.contains("dark");
  };
  const nextMode = isDarkMode() ? "light" : "dark";

  applyMode(nextMode);
}

export function applyMode(mode: ThemeMode): void {
  const root = document?.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(mode);
  localStorage.setItem(STORAGE_KEY, mode);
}
