// Landing page composition — sections are mounted here in reading order.
// Each section is a self-contained component that pulls its own copy from next-intl.
// Placeholder during scaffolding; sections are wired in subsequent feature branches.

export default function HomePage() {
  return (
    <main className="relative">
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="max-w-xl space-y-4 text-center">
          <p className="text-sm uppercase tracking-widest text-brand-300">erusoftech</p>
          <h1 className="text-display-2 font-semibold text-balance">
            <span className="gradient-text">Scaffold ready.</span>
          </h1>
          <p className="text-white/60">
            Sections wire up in subsequent feature branches.
          </p>
        </div>
      </div>
    </main>
  );
}
