import { useCallback, useEffect, useState } from "react";

export default function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const setVitibility = useCallback(() => {
    if (window.scrollY > 700) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    setVitibility();
    window.addEventListener("scroll", setVitibility);
    return () => {
      window.removeEventListener("scroll", setVitibility);
    };
  }, []);

  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      {...(isVisible && { "data-active": true })}
      aria-label="Scroll to top"
      className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300 cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 fixed bottom-10 right-10 z-50 bg-black/2 backdrop-blur-sm opacity-0 data-active:opacity-100 transition-opacity duration-300"
    >
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>
  );
}
