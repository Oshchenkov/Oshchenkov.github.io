"use client";
import { useLayoutEffect } from "react";
import {
  getInitialMode,
  applyMode,
  toggleMode,
} from "@/src/shared/utils/changeMode";
import {
  SunIcon,
  MoonIcon,
  SunIcon2,
  MoonIcon2,
} from "@/src/shared/ui/svgJSXIcons";

export default function Header() {
  useLayoutEffect(() => {
    applyMode(getInitialMode());
  }, []);

  return (
    <header className="container-x container-y flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Portfolio
      </h1>
      <button
        onClick={toggleMode}
        aria-label="Toggle theme"
        className="rounded-lg p-2 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <MoonIcon />
        <SunIcon />
      </button>
      <button
        onClick={toggleMode}
        aria-label="Toggle theme 2"
        className="rounded-lg p-2 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <MoonIcon2 />
        <SunIcon2 />
      </button>
    </header>
  );
}
