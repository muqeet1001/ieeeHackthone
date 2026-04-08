import { motion } from 'framer-motion';
import { FadeInView } from './animations';

const keyframeStyles = `
@keyframes redbull-float {
  0%, 100% { transform: translateY(0px) rotate(-5deg); }
  50%       { transform: translateY(-16px) rotate(-2deg); }
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50%       { opacity: 0.65; transform: scale(1.1); }
}
@keyframes energy-ring {
  0%   { transform: scale(0.85); opacity: 0.5; }
  100% { transform: scale(2.4);  opacity: 0;   }
}
@keyframes particle-up {
  0%   { transform: translateY(0)    scale(1);   opacity: 0.9; }
  100% { transform: translateY(-70px) scale(0);  opacity: 0;   }
}
`;

const PARTICLES = [
  { left: '20%', top: '60%', delay: '0s',    dur: '2.4s', color: 'var(--color-primary)' },
  { left: '75%', top: '35%', delay: '0.6s',  dur: '2.8s', color: 'var(--color-secondary)' },
  { left: '40%', top: '75%', delay: '1.1s',  dur: '2.1s', color: 'var(--color-tertiary)' },
  { left: '60%', top: '20%', delay: '0.3s',  dur: '3.0s', color: 'var(--color-primary)' },
  { left: '85%', top: '65%', delay: '1.5s',  dur: '2.5s', color: 'var(--color-secondary)' },
  { left: '15%', top: '30%', delay: '0.9s',  dur: '2.2s', color: 'var(--color-tertiary)' },
];

export default function Sponsors() {
  return (
    <>
      <style>{keyframeStyles}</style>

      <section id="sponsors" className="relative py-24 px-6 overflow-hidden bg-surface-container-low">

        {/* Ambient blobs — same pattern used in Prizes.jsx */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -right-20 bottom-0 w-[400px] h-[400px] bg-tertiary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">

          {/* ── Section label ── */}
          <FadeInView>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-secondary" />
              <p className="font-label text-[10px] tracking-[0.5em] text-secondary/80 font-bold uppercase">
                ENERGY SPONSOR
              </p>
            </div>
          </FadeInView>

          {/* ── Main Grid ── */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">

            {/* Left — copy */}
            <div className="md:col-span-7 order-2 md:order-1">
              <FadeInView delay={0.1}>
                <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
                  POWERED<br />
                  <span className="text-secondary">BY RED</span>{' '}
                  <span className="text-primary">BULL</span>
                </h2>
              </FadeInView>

              <FadeInView delay={0.2}>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl mb-8">
                  Red Bull gives you wings — and the fuel to code through the night.
                  Stay sharp, stay energized, and build something extraordinary at&nbsp;
                  <span className="text-on-surface font-semibold">AI IGNITE 2026</span>.
                </p>
              </FadeInView>

              {/* Tags — same pill style as Features tech tracks */}
              <FadeInView delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { label: 'UNLIMITED ENERGY',  color: 'primary' },
                    { label: 'ALL-NIGHT FUEL',     color: 'secondary' },
                    { label: 'HACK HARDER',        color: 'tertiary' },
                  ].map(({ label, color }) => (
                    <motion.span
                      key={label}
                      className={`bg-surface px-4 py-2 font-label text-xs border border-dashed border-outline-variant text-${color}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {label}
                    </motion.span>
                  ))}
                </div>
              </FadeInView>

              {/* Attribution — same icon + label pattern as CTA */}
              <FadeInView delay={0.4}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-secondary text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bolt
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-label tracking-widest uppercase">
                    Official Energy Drink Sponsor — AI IGNITE 2026
                  </p>
                </div>
              </FadeInView>
            </div>

            {/* Right — can visual */}
            <div className="md:col-span-5 order-1 md:order-2 flex items-center justify-center">
              <FadeInView delay={0.15}>
                <div className="relative w-64 h-72 md:w-80 md:h-88 flex items-center justify-center">

                  {/* Pulsing rings */}
                  {['primary', 'tertiary', 'secondary'].map((c, i) => (
                    <div
                      key={c}
                      className={`absolute inset-4 rounded-full border border-${c}/30`}
                      style={{ animation: `energy-ring 3s ${i * 1}s ease-out infinite` }}
                    />
                  ))}

                  {/* Central glow blob */}
                  <div
                    className="absolute w-44 h-44 md:w-52 md:h-52 rounded-full bg-primary/10"
                    style={{
                      filter: 'blur(40px)',
                      animation: 'glow-pulse 4s ease-in-out infinite',
                    }}
                  />

                  {/* Floating energy particles */}
                  {PARTICLES.map((p, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        left: p.left, top: p.top,
                        background: p.color,
                        animation: `particle-up ${p.dur} ${p.delay} ease-out infinite`,
                      }}
                    />
                  ))}

                  {/* The can — floating in primary glow */}
                  <motion.img
                    src="/redbull-can.png"
                    alt="Red Bull Energy Drink — Official Sponsor"
                    className="relative z-10 w-40 md:w-52 h-auto"
                    style={{
                      animation: 'redbull-float 5s ease-in-out infinite',
                      filter: 'drop-shadow(0 0 30px rgba(255,124,245,0.35)) drop-shadow(0 0 60px rgba(0,253,0,0.15))',
                    }}
                    whileHover={{ scale: 1.08, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  />

                  {/* Neo-brutalist corner accents */}
                  <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-primary/40" />
                  <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-secondary/40" />
                </div>
              </FadeInView>
            </div>
          </div>

          {/* Divider — same style as used across site */}
          <FadeInView delay={0.5}>
            <div className="mt-16 flex items-center gap-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <span className="font-label text-[9px] tracking-[0.6em] text-on-surface-variant/40 uppercase whitespace-nowrap">
                WINGS FOR YOUR CODE
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
