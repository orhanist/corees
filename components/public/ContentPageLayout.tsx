type ContentPageLayoutProps = {
  title: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
  /** Use "narrow" for policy pages (Terms, Privacy, Refund) */
  width?: "default" | "narrow";
};

export function ContentPageLayout({ title, lead, children, width = "default" }: ContentPageLayoutProps) {
  const maxWidth = width === "narrow" ? "max-w-5xl" : "max-w-7xl";

  return (
    <div className="min-h-[60vh] bg-[#f2f4f8] dark:bg-[var(--surface)]">
      <header className="border-b border-slate-200/60 bg-white/50 dark:border-slate-700/60 dark:bg-slate-900/30">
        <div className={`mx-auto w-full ${maxWidth} px-4 py-10`}>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
            {title}
          </h1>
          {lead != null && (
            <div className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              {lead}
            </div>
          )}
        </div>
      </header>

      <div className={`mx-auto w-full ${maxWidth} px-4 py-10`}>{children}</div>
    </div>
  );
}
