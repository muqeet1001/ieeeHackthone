export default function Prizes() {
  return (
<section className="min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden relative" id="prizes">
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary opacity-[0.03] blur-[100px] rounded-full"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div id="prizes-left">
            <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12 leading-tight">THE<br /><span className="text-tertiary">REWARDS</span></h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-surface-container-highest p-4 flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-4xl">workspace_premium</span>
                </div>
                <div>
                  <h4 className="font-headline text-xl font-bold uppercase mb-1">CERTIFICATES FOR ALL</h4>
                  <p className="text-on-surface-variant">Validated proof of participation and AI proficiency for every attendee.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-surface-container-highest p-4 flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-4xl">redeem</span>
                </div>
                <div>
                  <h4 className="font-headline text-xl font-bold uppercase mb-1">EXCITING GOODIES</h4>
                  <p className="text-on-surface-variant">Exclusive swag, tech stickers, and developer merch for the top performers.</p>
                </div>
              </div>
            </div>
          </div>
          <div id="prizes-box" className="relative">
            <div className="absolute inset-0 bg-primary opacity-20 blur-2xl -rotate-3"></div>
            <div className="relative bg-primary p-12 text-on-primary-fixed flex flex-col items-center justify-center text-center shadow-2xl">
              <div className="w-16 h-1 bg-on-primary-fixed mb-8"></div>
              <p className="font-label font-bold tracking-[0.4em] uppercase text-sm mb-4">GRAND PRIZE POOL</p>
              <div className="font-headline text-7xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
                ₹20,000
              </div>
              <p className="font-headline text-2xl font-bold uppercase mb-8">WINNER TAKES ALL</p>
              <div className="w-full h-[1px] bg-on-primary-fixed opacity-30 mb-8"></div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 flex items-center justify-center text-center">
              <svg className="absolute inset-0 animate-spin-slow opacity-80" viewBox="0 0 100 100">
                <path d="M50 0 L61 35 L97 35 L68 57 L79 92 L50 70 L21 92 L32 57 L3 35 L39 35 Z" fill="#00fd00"></path>
              </svg>
              <span className="relative font-label font-black text-[10px] text-on-secondary-fixed leading-none uppercase rotate-12">TOP<br />TIER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
