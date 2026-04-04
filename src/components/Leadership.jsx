import { motion } from 'framer-motion';

const leaders = [
  {
    title: "PATRON",
    name: "Shri C.M Ibrahim Saheb (Chairman)",
    image: "/chairman.jpeg"
  },
  {
    title: "PATRON",
    name: "Shri C.M Faiz Mohammed (Director)",
    image: "/directorjpeg.jpeg"
  },
  {
    title: "CHAIRPERSON",
    name: "Dr. Mohammed Riyaz Ahmed (Principal)",
    image: "/priciple.jpeg"
  },
  {
    title: "CONVENOR",
    name: "Dr. Smitha Kurian (HOD)",
    image: "/hod.jpeg"
  }
];

export default function Leadership() {
  return (
    <section className="relative px-6 py-24 bg-surface-container-low border-t border-dashed border-[#262626]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight text-on-surface">OUR PATRONS</h2>
          <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-body">
            We extend our deepest gratitude to our institution's visionary leadership. Their unwavering support, guidance, and dedication constitute the foundational pillars in making AI IGNITE 2026 a reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, i) => (
            <div key={i} className="group flex flex-col items-center bg-surface-container border-2 border-[#262626] hover:border-primary transition-all duration-300 p-8 relative overflow-hidden hover:-translate-y-2">
              {/* Image Container with Neo-brutalist styling */}
              <div className="mb-6 w-48 h-48 relative grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-500 outline outline-2 outline-offset-4 outline-[#262626] group-hover:outline-primary z-10 shadow-[8px_8px_0px_0px_rgba(38,38,38,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(255,124,245,0.4)]">
                <img 
                  src={leader.image} 
                  alt={leader.title} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              <div className="text-center relative z-10 mt-6">
                <h3 className="font-headline text-xl font-bold uppercase text-primary mb-2 tracking-widest">{leader.title}</h3>
                <p className="font-label text-sm text-on-surface-variant font-medium tracking-wide uppercase bg-surface-container-high px-4 py-2 border border-dashed border-[#262626]">{leader.name}</p>
              </div>

              {/* Background hover effect */}
              <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 translate-x-12 -translate-y-12 rotate-45 group-hover:bg-primary/20 transition-all duration-700 pointer-events-none z-0"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
