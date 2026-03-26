export default function Schedule() {
  return (
<section className="min-h-screen flex flex-col justify-center py-24 bg-surface-container-low border-y border-dashed border-outline-variant" id="schedule">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 id="schedule-heading" className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">THE<br /><span className="text-primary">TIMELINE</span></h2>
          <div className="text-right mt-6 md:mt-0">
            <p className="font-label text-secondary tracking-[0.3em] font-bold">STATUS: SCHEDULE_SYNCED</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-0 border border-outline-variant">
          <div id="schedule-day1" className="p-10 border-b md:border-b-0 md:border-r border-outline-variant hover:bg-surface transition-colors group">
            <div className="flex justify-between items-start mb-8">
              <span className="font-headline text-8xl font-black text-outline-variant group-hover:text-primary transition-colors opacity-30">01</span>
              <div className="bg-primary text-on-primary-fixed px-3 py-1 font-label font-bold text-xs">MASTERCLASS</div>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6 uppercase">Day 1 – AI Masterclass</h3>
            <ul className="space-y-4 font-body text-on-surface-variant">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary"></span>
                <span>Learn to build with AI - Foundation & Advanced</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary"></span>
                <span>Hands-on session with industry mentors</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary"></span>
                <span>Topics: Prompt Engineering & AI Tooling</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary"></span>
                <span>Rapid Development Frameworks workshop</span>
              </li>
            </ul>
          </div>
          <div id="schedule-day2" className="p-10 hover:bg-surface transition-colors group">
            <div className="flex justify-between items-start mb-8">
              <span className="font-headline text-8xl font-black text-outline-variant group-hover:text-secondary transition-colors opacity-30">02</span>
              <div className="bg-secondary text-on-secondary-fixed px-3 py-1 font-label font-bold text-xs">HACKATHON</div>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6 uppercase">Day 2 – Hackathon</h3>
            <p className="font-body text-on-surface-variant mb-6 leading-relaxed">
              The ultimate test of innovation. The specific theme-based challenge will be revealed immediately after the Day 1 Masterclass.
            </p>
            <div className="bg-surface-container-high p-6 border-l-2 border-secondary">
              <p className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-2 italic">MISSION OBJECTIVE</p>
              <p className="text-sm font-body italic text-on-surface">"Leverage neural architectures to solve real-world bottlenecks in 24 hours."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
