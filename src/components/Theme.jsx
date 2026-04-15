import React from 'react';
import ScratchCard from './ui/ScratchCard';

export default function Theme() {
  return (
    <section 
      className="min-h-[80vh] flex flex-col justify-center py-24 px-6 relative overflow-hidden select-none" 
      id="theme"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-40"></div>
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <ScratchCard>
          <div className="flex flex-col items-center text-center">
            {/* Section Label */}
            <div className="mb-8">
              <span className="font-label text-xs sm:text-sm tracking-[0.4em] font-bold uppercase py-2 px-4 border border-secondary/20 bg-secondary/5 backdrop-blur-sm text-secondary">
                OFFICIAL HACKATHON THEME
              </span>
            </div>

            {/* Theme Title */}
            <div className="relative mb-12">
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-80 transition-opacity"></div>
              <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">AI FOR</span>
                <br />
                <span className="text-primary drop-shadow-[0_0_30px_rgba(255,124,245,0.5)]">
                  IMPACT
                </span>
              </h2>
            </div>

            {/* Description */}
            <div className="max-w-xl mx-auto">
              <p className="font-body text-lg md:text-xl leading-relaxed text-on-surface-variant opacity-90">
                Using Artificial Intelligence to solve real-world challenges and create a sustainable future through innovative technology.
              </p>
              
              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 mt-12">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-primary/30"></div>
                <div className="w-2 h-2 rotate-45 border border-primary/50 bg-primary/10"></div>
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-primary/30"></div>
              </div>
            </div>
          </div>
        </ScratchCard>
      </div>
      
      {/* Side decorative text */}
      <div className="absolute left-10 top-1/2 -rotate-90 origin-left hidden lg:block">
        <span className="font-label text-[10px] tracking-[1em] uppercase font-black text-white/10">
          SYSTEM_INITIALIZED
        </span>
      </div>
      <div className="absolute right-10 top-1/2 rotate-90 origin-right hidden lg:block">
        <span className="font-label text-[10px] tracking-[1em] uppercase font-black text-white/10">
          CORE_DIRECTIVE_01
        </span>
      </div>
    </section>
  );
}

