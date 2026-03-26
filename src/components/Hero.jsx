export default function Hero() {
  return (
    <section className="relative min-h-[921px] flex flex-col items-center justify-center overflow-hidden px-6 geometric-bg">
      <div className="absolute top-20 left-[-5%] w-64 h-64 bg-primary opacity-10 blur-[120px]"></div>
      <div className="absolute bottom-20 right-[-5%] w-80 h-80 bg-secondary opacity-10 blur-[120px]"></div>
      <div className="absolute top-1/4 right-10 w-0 h-0 border-l-[50px] border-l-transparent border-b-[86px] border-b-tertiary opacity-20 rotate-12"></div>
      <div className="absolute bottom-1/4 left-10 w-24 h-24 border-4 border-dashed border-primary opacity-20 rounded-full"></div>
      <div className="z-10 text-center max-w-6xl">
        <div className="inline-block bg-secondary text-on-secondary-fixed px-4 py-1 mb-8 font-label font-bold tracking-[0.2em] text-sm">
          HKBK COLLEGE OF ENGINEERING
        </div>
        <h1 className="font-headline text-6xl md:text-9xl font-black tracking-tighter leading-none mb-6 neon-glow-primary">
          AI IGNITE<br />HACKATHON<br /><span className="text-secondary">2026</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
          <p className="font-headline text-2xl md:text-4xl font-bold tracking-tighter text-tertiary italic">
            BUILD. LEARN. INNOVATE.
          </p>
          <div className="h-[2px] w-24 bg-outline-variant hidden md:block"></div>
          <p className="font-label text-xl tracking-widest text-on-surface-variant">
            48 HOURS OF PURE NEURAL FIRE
          </p>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-label text-xs tracking-widest uppercase">Initializing System</span>
        <span className="material-symbols-outlined animate-bounce">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
}
