import { motion } from 'framer-motion';

const partners = [
  { name: 'AICTE', logo: '/AICTE-Logo.webp' },
  { name: 'NBA', logo: '/nba.webp' },
  { name: 'VTU', logo: '/VTU-webp.webp' },
  { name: 'IEEE CS', logo: '/ieeecsjpeg.jpeg' },
  { name: 'IEEE Bangalore', logo: '/ieeebanl.png' },
];

export default function PartnerLogos() {
  // Double the array for seamless looping
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="w-full my-7 relative overflow-hidden border-y border-primary/20 bg-surface/30 backdrop-blur-lg shadow-[0_0_60px_rgba(255,124,245,0.05)]">
      {/* Decorative gradient overlays for soft edges */}
      <div className="absolute top-0 left-0 w-32 h-full z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center">
        {/* "Official Partners" side-label for a more integrated look */}
        <div className="hidden lg:flex items-center px-12 z-20 bg-white/5 h-full border-r border-white/10 shrink-0">
          <p className="font-label text-[9px] tracking-[0.6em] text-primary/80 font-bold uppercase whitespace-nowrap">
            TRUSTED PARTNERS
          </p>
        </div>

        <div className="flex-1 overflow-hidden py-10 md:py-12">
          <motion.div 
            className="flex gap-20 md:gap-40 items-center flex-nowrap"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10, // Perfectly balanced high speed
                ease: "linear",
              },
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 group px-4 py-3 cursor-pointer"
              >
                <div className="p-1 md:p-2 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary/5">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-10 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,124,245,0.5)] filter brightness-100 contrast-100 grayscale-[0.1] hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
