import { motion } from 'framer-motion';

const facultyCoordinators = [
  "Prof. Denzina",
  "Prof. Sushmitha",
  "Prof. Bhagyashree",
  "Prof. Subhadra",
  "Prof. Ayesha Anjum",
  "Prof. Jenita"
];

const studentCoordinators = [
  "Abdul Muqeet",
  "Bhavani Singh",
  "Aryan Kapoor",
  "Seema Sultana",
  "Siddiq",
  "SYED SHAHID HAFEEZ",
  "Likhith Metallica",
  "Md Yusuf Ali",
  "Manisha Chinmayee S",
  "Shahensha khatun",
  "Satwik Girish Gosavi",
  "Shafiulla",
  "Rushil Sham",
  "Raju Mohammad Zuhaib Wani"
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Coordinators() {
  return (
    <section className="relative px-6 py-24 geometric-bg overflow-hidden border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-headline text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-on-surface"
          >
            Organizing <span className="text-secondary">Committee</span>
          </motion.h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Faculty Section */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="font-headline text-2xl font-bold text-primary flex items-center gap-3 mb-8">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">01</span>
              FACULTY COORDINATORS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facultyCoordinators.map((name, i) => (
                <motion.div 
                  key={i}
                  variants={item}
                  whileHover={{ x: 10 }}
                  className="p-5 bg-surface-container border-l-4 border-primary hover:bg-surface-container-high transition-colors flex items-center justify-between group cursor-default shadow-[4px_4px_0px_0px_#262626]"
                >
                  <span className="font-label text-lg font-bold tracking-tight text-on-surface">{name}</span>
                  <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">school</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Student Section */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="font-headline text-2xl font-bold text-secondary flex items-center gap-3 mb-8">
              <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm">02</span>
              STUDENT COORDINATORS
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {studentCoordinators.map((name, i) => (
                <motion.div 
                  key={i}
                  variants={item}
                  whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
                  className="px-4 py-2 bg-surface-container-low border border-[#262626] rounded-full hover:border-secondary hover:text-secondary transition-all cursor-default font-body text-sm md:text-base font-medium"
                >
                  {name}
                </motion.div>
              ))}
            </div>
            
            {/* Decorative background element to match the 'AI' theme */}
            <div className="mt-12 p-6 rounded-2xl border border-dashed border-[#262626] bg-black/20">
              <p className="text-xs font-label text-on-surface-variant uppercase tracking-[0.3em] mb-4">Core System Drivers</p>
              <div className="flex gap-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={`h-8 w-1 rounded-full ${i % 3 === 0 ? 'bg-primary' : i % 2 === 0 ? 'bg-secondary' : 'bg-[#262626]'}`} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
