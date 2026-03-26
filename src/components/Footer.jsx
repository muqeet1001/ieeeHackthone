export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-8 w-full bg-[#131313] py-12 border-t border-dashed border-[#262626] font-headline text-sm tracking-widest uppercase">
      <div className="mb-8 md:mb-0 text-center md:text-left">
        <div className="text-lg font-bold text-primary mb-2">AI IGNITE 2026</div>
        <p className="text-gray-500 font-normal">© 2026 AI IGNITE. ALL RIGHTS RESERVED.</p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-2">
        <div className="flex gap-8 mb-4">
          <a className="text-secondary hover:text-tertiary transition-colors" href="#">VENUE: HKBK COLLEGE OF ENGINEERING</a>
          <a className="text-gray-500 hover:text-tertiary transition-colors" href="#">PRIVACY</a>
          <a className="text-gray-500 hover:text-tertiary transition-colors" href="#">TERMS</a>
        </div>
        <div className="flex gap-4 text-[10px] text-on-surface-variant opacity-50">
          <span>DAY 1: [MARCH 14, 2026]</span>
          <span className="w-1 h-1 bg-outline-variant rounded-full self-center"></span>
          <span>DAY 2: [MARCH 15, 2026]</span>
        </div>
      </div>
    </footer>
  );
}
