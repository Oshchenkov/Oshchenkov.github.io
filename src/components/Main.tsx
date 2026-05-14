import aboutData from "@/src/store/about";
import experienceData from "@/src/store/experience";
import SectionTitle from "@/src/components/SectionTitle";
import { projectsData } from "@/src/store/projects";
import type { ProjectsData } from "@/src/store/projects";
import type React from "react";
import type { Ref } from "react";

export default function Main({
  aboutSectionRef,
  experienceSectionRef,
  referenceSectionRef,
  projectsSectionRef,
}: {
  aboutSectionRef: Ref<HTMLDivElement>;
  experienceSectionRef: Ref<HTMLDivElement>;
  referenceSectionRef: Ref<HTMLDivElement>;
  projectsSectionRef: Ref<HTMLDivElement>;
}) {
  return (
    <main className="pt-24 lg:w-1/2 lg:py-24">
      {/* <!-- About Section --> */}
      <section
        id={aboutData.id}
        ref={aboutSectionRef}
        className="mb-24 scroll-mt-24 "
      >
        <SectionTitle>About</SectionTitle>
        <div className="space-y-4 text-lg leading-relaxed z-10">
          <div
            dangerouslySetInnerHTML={{ __html: aboutData.description }}
          ></div>
        </div>
      </section>

      {/* <!-- Experience Section --> */}
      <section
        id="experience"
        ref={experienceSectionRef}
        className="mb-24 scroll-mt-24 "
      >
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-12 relative z-10">
          {experienceData.map((job, idx) => {
            return (
              <div
                key={idx}
                className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50"
              >
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100/80 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-slate-800/50 dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"></div>

                <header
                  className="z-10 mb-2 mt-1 text-sm lg:text-[10px] font-semibold tracking-wide text-slate-500 sm:col-span-2"
                  aria-label="2024 to Present"
                >
                  <div className="">
                    {job.date.start.mm} {job.date.start.yyyy} —{" "}
                    {job.date.end.mm} {job.date.end.yyyy}
                  </div>
                  <div className="my-2 lg:my-4">
                    {job.date.duration.y} {job.date.duration.m}
                  </div>
                </header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-800 dark:text-slate-200">
                    <a
                      href={job.companyLink}
                      target="_blank"
                      className="inline-flex items-baseline font-semibold leading-tight text-slate-800 hover:text-teal-600 focus-visible:text-teal-600 group/link text-base dark:text-slate-200 dark:hover:text-teal-300 dark:focus-visible:text-teal-300"
                      rel="nofollow noreferrer noopener"
                    >
                      {job.positionName} | {job.companyName}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </h3>

                  <ul className="mt-2 flex flex-col leading-normal pl-2">
                    {job.positionDescrtiption.map((descItem, descIdx) => {
                      return (
                        <li
                          key={descIdx}
                          className="mb-2 list-['-'] pl-1"
                          dangerouslySetInnerHTML={{ __html: descItem }}
                        ></li>
                      );
                    })}
                  </ul>

                  <ul
                    className="mt-2 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {job.skills.map((skill, skillIdx) => {
                      return (
                        <li key={skillIdx} className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium leading-5 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                            {skill}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* <!-- Projects Section --> */}
      <section
        id="projects"
        ref={projectsSectionRef}
        className="mb-24 scroll-mt-24"
      >
        <SectionTitle>Projects</SectionTitle>

        <div className="space-y-12  relative z-10">
          {projectsData.map((project: ProjectsData[number], idx) => {
            return (
              <div
                key={project.id}
                className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50"
              >
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100/80 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-slate-800/50 dark:lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"></div>

                <div className="z-10 sm:col-span-4">
                  <div className="rounded border-2 border-slate-200/60 transition group-hover:border-teal-500/30 dark:border-slate-200/10 dark:group-hover:border-teal-300/30">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-auto rounded opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
                <div className="z-10 sm:col-span-4 max-sm:mt-4">
                  <h3 className="font-medium leading-snug text-slate-800 dark:text-slate-200 ">
                    <a
                      href={project.link}
                      className="inline-flex items-baseline font-medium leading-tight text-slate-800 hover:text-teal-600 focus-visible:text-teal-600 group/link text-base dark:text-slate-200 dark:hover:text-teal-300 dark:focus-visible:text-teal-300"
                      target="_blank"
                      rel="nofollow noreferrer noopener"
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                      <span>{project.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-normal">
                    {project.description}
                  </p>
                  <ul
                    className="mt-2 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {project.skills.map((skill, skillIdx) => {
                      return (
                        <li key={skillIdx} className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium leading-5 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                            {skill}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
