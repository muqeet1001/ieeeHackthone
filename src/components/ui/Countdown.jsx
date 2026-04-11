import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    // If no targetDate passed, set it to 3 days from now
    // Actually, to make it consistent and not reset on every refresh identically,
    // let's use a fixed date that is 3 days from event start, or just pass a fixed date in Hero.jsx
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div className="flex justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 z-20 pointer-events-auto">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center hero-fade-up" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#ff7cf5]/20 blur-xl rounded-lg group-hover:bg-[#ff7cf5]/40 transition-colors duration-500"></div>
            {/* Box */}
            <div className="relative border border-[#ff7cf5]/30 bg-black/40 backdrop-blur-md rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-110">
              <span className="font-headline text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c1fffe] to-[#ff7cf5]">
                {unit.value.toString().padStart(2, '0')}
              </span>
              <span className="font-label text-[10px] sm:text-xs text-[#c1fffe] tracking-widest mt-1 sm:mt-2 opacity-80 uppercase">
                {unit.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
