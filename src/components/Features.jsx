export default function Features() {
  return (
    <section id="features-section" className="min-h-screen flex flex-col justify-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div id="feat-card-1" className="md:col-span-4 bg-surface-container-low p-8 border-l-4 border-primary">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">groups</span>
            <h3 className="font-headline text-2xl font-bold mb-4 uppercase">TEAM SIZE 2–4</h3>
            <p className="text-on-surface-variant leading-relaxed">Open for all branches. Form your squad and dive into the future of automated intelligence.</p>
          </div>
          <div id="feat-card-2" className="md:col-span-8 bg-surface-container p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 translate-x-16 -translate-y-16 rotate-45 group-hover:bg-secondary/20 transition-all"></div>
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">model_training</span>
            <h3 className="font-headline text-3xl font-bold mb-4 uppercase">AI MASTERCLASS</h3>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">Learn to build with AI. Hands-on sessions covering Prompt Engineering, AI Tools, and Rapid Development workflows to prepare you for the challenge.</p>
          </div>
          <div id="feat-card-3" className="md:col-span-7 bg-surface-container-high p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-6 uppercase tracking-tight">CURATED TECH TRACKS</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-surface px-4 py-2 font-label text-xs border border-dashed border-outline-variant text-tertiary">LLM OPS</span>
                <span className="bg-surface px-4 py-2 font-label text-xs border border-dashed border-outline-variant text-tertiary">GENERATIVE ART</span>
                <span className="bg-surface px-4 py-2 font-label text-xs border border-dashed border-outline-variant text-tertiary">AGENTIC AI</span>
                <span className="bg-surface px-4 py-2 font-label text-xs border border-dashed border-outline-variant text-tertiary">NEURAL SEARCH</span>
              </div>
            </div>
          </div>
          <div id="feat-card-4" className="md:col-span-5 bg-tertiary text-on-tertiary-fixed p-8 flex items-center justify-center text-center">
            <div>
              <span className="font-headline text-4xl font-black uppercase tracking-tighter block mb-2">OPEN TO ALL</span>
              <p className="font-label text-sm tracking-widest font-bold">REGARDLESS OF YOUR MAJOR</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
