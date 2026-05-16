import aboutData from "@/src/store/about";
import { navigationData, type NavigationData } from "@/src/store/navigation";
import { useRef, useLayoutEffect } from "react";
import type { HandleNavClick } from "@/app/page";
import {
  getInitialMode,
  applyMode,
  toggleMode,
} from "@/src/shared/utils/changeMode";
import { SunIcon, MoonIcon } from "@/src/shared/ui/svgJSXIcons";

export default function Sidebar({
  handleNavClick,
  activeSection,
}: {
  handleNavClick: HandleNavClick;
  activeSection: string;
}) {
  const navLinks = useRef(new Map());
  useLayoutEffect(() => {
    applyMode(getInitialMode());
  }, []);

  return (
    <aside className="sidebar lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl fade-in dark:text-slate-200">
          {aboutData.name}
        </h1>
        <h2 className="my-8 text-lg font-semibold tracking-tight text-slate-800 sm:text-xl fade-in stagger-1 dark:text-slate-200">
          {aboutData.position}
        </h2>
        <p className="mt-4 lg:max-w-xs leading-relaxed fade-in stagger-2">
          {aboutData.subtitle}
        </p>

        {/* <!-- Desktop Navigation --> */}
        <nav
          className="mt-16 hidden lg:block fade-in stagger-3"
          aria-label="In-page navigation"
        >
          <ul className="flex flex-col gap-4 text-sm font-medium uppercase tracking-widest ">
            {navigationData.map((link, idx) => {
              return (
                <li
                  data-link-id={link.id}
                  key={link.id}
                  ref={(node) => {
                    if (node) {
                      navLinks.current.set(link.id, node);
                    } else {
                      navLinks.current.delete(link.id);
                    }
                  }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      handleNavClick(e, link);
                    }}
                    {...(activeSection === link.id && { "data-active": true })}
                    className="nav-link relative pl-12  dark:text-slate-400  hover:text-teal-600 
                    data-active:dark:text-teal-300 data-active:text-teal-600 before:absolute before:top-[50%] before:left-0 before:w-8 before:h-px before:bg-black/40 hover:before:bg-teal-600 dark:before:bg-slate-400 dark:hover:before:bg-teal-300 data-active:before:bg-teal-300 before:-translate-y-1/2 t data-active:before:w-16 data-active:pl-20 before:transition-[width] before:duration-300 before:ease transition-[padding] duration-300 ease"
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex items-center  gap-6 lg:mt-0 mt-8 fade-in stagger-4">
        {/* <!-- Social Links --> */}
        <ul
          className="ml-1 flex items-center gap-5 self-center"
          aria-label="Social links"
        >
          <li className="flex items-conter">
            {/* <!-- Dark Mode Toggle --> */}
            <button
              onClick={toggleMode}
              className="text-slate-500 hover:text-teal-600 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:text-slate-400 dark:hover:text-teal-300 dark:hover:bg-white/5 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              <SunIcon />
              <MoonIcon />
            </button>
          </li>
          <li className="flex items-conter">
            <a
              href="/Vitalii_Oshchenkov, CV.pdf"
              className="text-slate-500 hover:text-teal-600 transition-colors dark:text-slate-400 dark:hover:text-teal-300"
              aria-label="Download CV"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M9 1H3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V5L9 1zM8 12l-2-2h1.5V7h1v3H10L8 12zM8 4.5V1.5l3 3H8z"></path>
              </svg>
            </a>
          </li>
          <li className="flex items-conter">
            <a
              href="https://github.com/Oshchenkov"
              className="text-slate-500 hover:text-teal-600 transition-colors dark:text-slate-400 dark:hover:text-teal-300"
              aria-label="GitHub"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-8"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </li>
          <li className="flex items-conter">
            <a
              href="https://www.linkedin.com/in/vitalii-oshchenkov/"
              className="text-slate-500 hover:text-teal-600 transition-colors dark:text-slate-400 dark:hover:text-teal-300"
              aria-label="LinkedIn"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-8"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </li>
          <li className="flex items-conter">
            <a
              href="https://codepen.io/Oshchenkov"
              className="text-slate-500 hover:text-teal-600 transition-colors dark:text-slate-400 dark:hover:text-teal-300"
              aria-label="codepen"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path
                  d="M3.06 41.732L32 60.932l28.94-19.2V22.268L32 3.068l-28.94 19.2zm57.878 0L32 22.268 3.06 41.732m0-19.463L32 41.47l28.94-19.2M32 3.068v19.2m0 19.463v19.2"
                  strokeWidth="5"
                ></path>
              </svg>
            </a>
          </li>
          <li className="flex items-conter">
            <a
              href="https://www.instagram.com/oshchenkovv/"
              className="text-slate-500 hover:text-teal-600 transition-colors dark:text-slate-400 dark:hover:text-teal-300"
              aria-label="instagram"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 1000"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
