"use client";

import Header from "@/src/components/Header";
import Sidebar from "@/src/components/Sidebar";
import Main from "@/src/components/Main";
import ScrollToTopBtn from "@/src/features/ScrollToTopBtn";
import { useEffect, useRef, useState } from "react";
import { navigationData, type NavigationData } from "@/src/store/navigation";

export type HandleNavClick = typeof handleNavClick;

function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  link: NavigationData[number],
): void {
  e.preventDefault();
  const isBrowser = typeof window === "object" && typeof document === "object";

  if (!isBrowser) {
    return;
  }

  const sectionEl = document.getElementById(link.id);
  if (!sectionEl) {
    return;
  }

  sectionEl.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

export default function Home() {
  /**
   * Handles mouse move event and triggers animation by setting the
   * background radial gradient attribute on the element.
   * @param {React.MouseEvent<HTMLDivElement>} e - mouse move event
   */
  function mouseMoveAnimationHandler(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.setAttribute(
      "style",
      `background: radial-gradient(600px at ${e.pageX}px ${e.pageY}px, var(--mouse-animation-color), transparent 80%);`,
    );
  }

  const aboutSectionRef = useRef(null);
  const experienceSectionRef = useRef(null);
  const referenceSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);

  const sectionsArr = [
    aboutSectionRef,
    experienceSectionRef,
    referenceSectionRef,
    projectsSectionRef,
  ];

  const [activeSection, setActiveSection] = useState(navigationData[0]?.id);
  const activeSectionSize = useRef(0);
  const activeSectionRef = useRef(navigationData[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        entries.forEach((el) => {
          const elViewSize = el.intersectionRect.height;

          if (activeSectionRef.current === el.target.id) {
            activeSectionSize.current = elViewSize;
          } else if (
            el.intersectionRatio === 1 ||
            elViewSize > activeSectionSize.current
          ) {
            setActiveSection(el.target.id);
            activeSectionRef.current = el.target.id;
            activeSectionSize.current = elViewSize;
            history.replaceState(null, "", `#${el.target.id}`);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    );

    sectionsArr.forEach((sectionRef) => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    });

    return () => {
      sectionsArr.forEach((sectionRef) => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      });
    };
  }, []);

  return (
    <div
      className="mainContainer duration-300"
      onMouseMove={(e) => mouseMoveAnimationHandler(e)}
    >
      {/* <Header /> */}
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 pt-20 lg:pt-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Sidebar
            handleNavClick={handleNavClick}
            activeSection={activeSection}
          />
          <Main
            aboutSectionRef={aboutSectionRef}
            experienceSectionRef={experienceSectionRef}
            referenceSectionRef={referenceSectionRef}
            projectsSectionRef={projectsSectionRef}
          />
        </div>
      </div>
      <ScrollToTopBtn />
    </div>
  );
}
