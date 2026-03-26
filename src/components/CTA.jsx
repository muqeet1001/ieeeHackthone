export default function CTA() {
  return (
    <section className="py-24 px-6 bg-surface-container">
      <div className="max-w-4xl mx-auto bg-surface-container-highest border-t-8 border-secondary p-8 md:p-16 relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 border-[20px] border-primary opacity-10 rounded-full"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-none">SECURE YOUR SLOT</h2>
            <p className="font-body text-on-surface-variant text-lg mb-8">Registration is mandatory. Join the most intense AI hackathon of the year at HKBK College of Engineering.</p>
            <button className="w-full md:w-auto bg-secondary text-on-secondary-fixed font-headline font-black text-xl px-12 py-5 uppercase tracking-tighter hover:bg-primary transition-all active:scale-95 duration-100">
              REGISTER NOW
            </button>
          </div>
          <div className="flex-shrink-0 bg-white p-4">
            <div className="w-40 h-40 bg-black flex flex-col items-center justify-center text-white p-2">
              <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full">
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-transparent col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-transparent col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
                <div className="bg-white col-span-1 row-span-1"></div>
              </div>
            </div>
            <p className="text-[10px] text-black font-label font-bold text-center mt-2 tracking-tighter">SCAN TO APPLY</p>
          </div>
        </div>
      </div>
    </section>
  );
}
