export default function SectionTitle({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="sticky top-0 lg:hidden px-6 py-5 z-20 -mx-6 lg:mb-8 bg-(--background)">
      <h2 className=" text-sm font-bold uppercase tracking-widest text-slate-900 lg:hidden dark:text-slate-200">
        {children}
      </h2>
    </div>
  );
}
