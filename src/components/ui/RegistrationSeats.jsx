import React from 'react';

/**
 * Hero strip: shows remaining team slots (replaces date countdown).
 */
export default function RegistrationSeats({
  seatsLeft,
  count,
  maxSlots,
  isFull,
  loading,
  error,
}) {
  const mainValue =
    loading ? '—' : error ? '—' : seatsLeft != null ? seatsLeft.toString().padStart(2, '0') : '—';

  const subline = (() => {
    if (loading) return 'Loading slots…';
    if (error) return 'Could not load slots';
    if (isFull) return 'Registration closed';
    if (count != null && seatsLeft != null) {
      return `${count} / ${maxSlots} teams registered`;
    }
    return `${maxSlots} team slots`;
  })();

  return (
    <div className="flex justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 z-20 pointer-events-auto">
      <div className="flex flex-col items-center hero-fade-up" style={{ animationDelay: '0.85s' }}>
        <div className="relative group">
          <div className="absolute inset-0 bg-[#ff7cf5]/20 blur-xl rounded-lg group-hover:bg-[#ff7cf5]/40 transition-colors duration-500" />
          <div className="relative border border-[#ff7cf5]/30 bg-black/40 backdrop-blur-md rounded-xl p-4 sm:p-6 min-w-[140px] sm:min-w-[200px] flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-[1.02]">
            <span className="font-headline text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c1fffe] to-[#ff7cf5] tabular-nums">
              {mainValue}
            </span>
            <span className="font-label text-[10px] sm:text-xs text-[#c1fffe] tracking-widest mt-2 sm:mt-3 opacity-90 uppercase text-center">
              {isFull ? 'Slots left' : 'Team slots left'}
            </span>
            <span className="font-label text-[9px] sm:text-[10px] text-white/50 tracking-wider mt-2 uppercase text-center max-w-[240px] leading-relaxed">
              {subline}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
