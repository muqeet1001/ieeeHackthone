export default function TopNavBar() {
  return (
    <header className="fixed top-0 z-50 flex justify-between items-center w-full px-6 py-4 bg-[#0e0e0e] font-headline font-bold tracking-tighter uppercase border-none">
      <div className="text-2xl font-black tracking-tighter text-primary uppercase">AI IGNITE 2026</div>
      <nav className="hidden md:flex gap-8">
        <a className="text-primary border-b-2 border-primary pb-1 hover:text-secondary transition-colors duration-200" href="#">ABOUT</a>
        <a className="text-white opacity-80 hover:text-secondary transition-colors duration-200" href="#schedule">SCHEDULE</a>
        <a className="text-white opacity-80 hover:text-secondary transition-colors duration-200" href="#prizes">PRIZES</a>
        <a className="text-white opacity-80 hover:text-secondary transition-colors duration-200" href="#team">TEAM</a>
        <a className="text-white opacity-80 hover:text-secondary transition-colors duration-200" href="#venue">VENUE</a>
      </nav>
      <button className="bg-primary text-on-primary-fixed px-6 py-2 font-bold tracking-tighter hover:bg-secondary transition-colors duration-200 active:scale-95 duration-100">
        REGISTER NOW
      </button>
    </header>
  );
}
