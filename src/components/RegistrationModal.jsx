import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample transitions for steps
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export default function RegistrationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [paymentFile, setPaymentFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [data, setData] = useState({
    teamName: '',
    memberCount: 2, // default
    members: [
      { id: 1, name: '', email: '', mobile: '', college: '', isLeader: true },
      { id: 2, name: '', email: '', mobile: '', college: '', isLeader: false },
    ],
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset state on close
      setTimeout(() => {
        setStep(1);
        setErrors({});
        setPaymentFile(null);
        setSubmitError('');
      }, 300);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleMemberCountChange = (e) => {
    const count = parseInt(e.target.value);
    setData((prev) => {
      const newMembers = [...prev.members];
      if (count > newMembers.length) {
        // Add members
        for (let i = newMembers.length; i < count; i++) {
          newMembers.push({ id: i + 1, name: '', email: '', mobile: '', college: '', isLeader: false });
        }
      } else {
        // Remove members
        newMembers.splice(count);
        // Ensure at least one leader exists if the leader was removed
        if (!newMembers.find((m) => m.isLeader) && newMembers.length > 0) {
          newMembers[0].isLeader = true;
        }
      }
      return { ...prev, memberCount: count, members: newMembers };
    });
  };

  const updateMember = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev.members];
      if (field === 'isLeader' && value === true) {
        // Only one leader allowed
        updated.forEach((m) => (m.isLeader = false));
      }
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, members: updated };
    });
  };

  // ──── VALIDATION ────
  const validateStep1 = () => {
    let newErrors = {};
    if (!data.teamName.trim()) newErrors.teamName = 'Team name is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) triggerShake();
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    data.members.forEach((m, i) => {
      if (!m.name.trim()) newErrors[`name_${i}`] = 'Required';
      if (!m.email.trim() || !/^\S+@\S+\.\S+$/.test(m.email)) newErrors[`email_${i}`] = 'Invalid email';
      if (!m.mobile.trim() || m.mobile.length < 10) newErrors[`mobile_${i}`] = 'Invalid phone';
      if (!(m.college && m.college.trim())) newErrors[`college_${i}`] = 'Required';
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) triggerShake();
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    
    if (step < 6) {
      setDirection(1);
      setStep((p) => p + 1);
    }
  };

  // ──── SUBMIT TO BACKEND ────
  const handleSubmit = async () => {
    if (!paymentFile) {
      setSubmitError('Please upload your payment screenshot first.');
      triggerShake();
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const formData = new FormData();
      formData.append('teamName', data.teamName);
      formData.append('memberCount', data.memberCount);
      formData.append('members', JSON.stringify(data.members));
      formData.append('paymentScreenshot', paymentFile);

      const res = await fetch('https://backend-hackathone-jh96bgz5r-mqts-projects.vercel.app/api/register', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Registration failed');
      }
      // Success — advance past the payment QR step to WhatsApp step
      setDirection(1);
      setStep(5);
    } catch (err) {
      setSubmitError(err.message);
      triggerShake();
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((p) => p - 1);
    }
  };

  // ──── RENDERERS ────
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col gap-6"
          >
            <div className="text-center mb-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-tight">Team Configuration</h2>
              <p className="text-on-surface-variant text-sm mt-2">Initialize your squad for the hackathon.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-tertiary uppercase tracking-wider">Squad Name</label>
              <input
                type="text"
                placeholder="e.g. Neural Ninjas"
                value={data.teamName}
                onChange={(e) => setData({ ...data, teamName: e.target.value })}
                className={`w-full bg-surface-container-high border ${errors.teamName ? 'border-error' : 'border-outline-variant focus:border-primary'} rounded-md px-4 py-3 text-white outline-none transition-colors`}
              />
              {errors.teamName && <p className="text-error text-xs">{errors.teamName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-tertiary uppercase tracking-wider">Number of Operatives</label>
              <select
                value={data.memberCount}
                onChange={handleMemberCountChange}
                className="w-full bg-surface-container-high border border-outline-variant focus:border-primary rounded-md px-4 py-3 text-white outline-none transition-colors appearance-none"
              >
                {[2, 3, 4].map((num) => (
                  <option key={num} value={num}>{num} Members</option>
                ))}
              </select>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col gap-6"
          >
            <div className="text-center mb-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-tight">Operative Details</h2>
              <p className="text-on-surface-variant text-sm mt-2">Identify your {data.memberCount} team members.</p>
            </div>

            <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-6 custom-scrollbar" data-lenis-prevent="true">
              {data.members.map((member, index) => (
                <div key={member.id} className="p-5 bg-surface-container-high rounded-md border border-outline-variant/50 relative">
                  
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-sm text-primary uppercase tracking-widest">Operative {index + 1}</h3>
                    <label className="flex items-center cursor-pointer text-xs text-on-surface-variant hover:text-white transition-colors">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-secondary bg-surface border-outline-variant cursor-pointer"
                        checked={member.isLeader}
                        onChange={(e) => updateMember(index, 'isLeader', e.target.checked)}
                      />
                      Team Leader
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={member.name}
                        onChange={(e) => updateMember(index, 'name', e.target.value)}
                        className={`w-full bg-surface border ${errors[`name_${index}`] ? 'border-error' : 'border-outline-variant focus:border-secondary'} rounded-md px-3 py-2 text-sm text-white outline-none transition-colors`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={member.email}
                        onChange={(e) => updateMember(index, 'email', e.target.value)}
                        className={`w-full bg-surface border ${errors[`email_${index}`] ? 'border-error' : 'border-outline-variant focus:border-secondary'} rounded-md px-3 py-2 text-sm text-white outline-none transition-colors`}
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={member.mobile}
                        onChange={(e) => updateMember(index, 'mobile', e.target.value)}
                        className={`w-full bg-surface border ${errors[`mobile_${index}`] ? 'border-error' : 'border-outline-variant focus:border-secondary'} rounded-md px-3 py-2 text-sm text-white outline-none transition-colors`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="College Name"
                        value={member.college || ''}
                        onChange={(e) => updateMember(index, 'college', e.target.value)}
                        className={`w-full bg-surface border ${errors[`college_${index}`] ? 'border-error' : 'border-outline-variant focus:border-secondary'} rounded-md px-3 py-2 text-sm text-white outline-none transition-colors`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        const leader = data.members.find(m => m.isLeader) || data.members[0];
        return (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col gap-6"
          >
            <div className="text-center mb-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-tight">System Ready</h2>
              <p className="text-on-surface-variant text-sm mt-2">Verify intel before processing deployment.</p>
            </div>

            <div className="bg-surface-container-high p-6 rounded-md border border-outline-variant/30 space-y-4">
              <div>
                <span className="text-xs text-on-surface-variant uppercase tracking-widest">Squad Name</span>
                <p className="text-xl font-bold text-primary neon-glow-primary">{data.teamName}</p>
              </div>
              
              <div className="h-px w-full bg-outline-variant/50" />

              <div>
                <span className="text-xs text-on-surface-variant uppercase tracking-widest mb-2 block">Roster ({data.memberCount})</span>
                <ul className="space-y-2">
                  {data.members.map((m, i) => (
                    <li key={m.id} className="flex justify-between text-sm bg-surface p-2 rounded">
                      <span className="text-white">{m.name || 'Unnamed'}</span>
                      {m.isLeader && <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded uppercase font-bold">Leader</span>}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px w-full bg-outline-variant/50" />
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant uppercase">Registration Fee</span>
                <span className="font-bold text-lg text-secondary">₹400</span>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col gap-6 items-center justify-center w-full"
          >
            <div className="text-center mb-2 w-full">
              <h2 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-tight">Payment Authorization</h2>
              <p className="text-on-surface-variant text-sm mt-2">Scan to transfer ₹400 and upload the receipt.</p>
            </div>
            
            <div className="w-72 h-72 mx-auto bg-surface-container-highest border-2 border-outline-variant/30 relative flex items-center justify-center shadow-[4px_4px_0_rgba(255,255,255,0.05)] bg-white p-3">
              <img src="/qr_payment.jpeg" alt="Payment QR Code" className="max-w-full max-h-full object-contain mx-auto block" />
            </div>

            <div className="w-full max-w-sm mx-auto flex flex-col items-center">
              <label className="text-xs font-bold text-tertiary uppercase tracking-wider block mb-2 text-center w-full">Upload Receipt Screenshot</label>
              <input
                type="file"
                accept="image/*"
                className="w-full bg-surface-container-high border border-outline-variant rounded-md px-4 py-3 text-sm text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-primary/20 file:text-primary hover:file:bg-primary/30 outline-none transition-colors"
                onChange={(e) => setPaymentFile(e.target.files[0] || null)}
              />
              {paymentFile && (
                <p className="text-xs text-primary mt-2 uppercase tracking-widest text-center w-full">✓ {paymentFile.name}</p>
              )}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col gap-6 items-center"
          >
            <div className="text-center mb-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-tight">Comms Established</h2>
              <p className="text-on-surface-variant text-sm mt-2">Join the operative WhatsApp group for updates.</p>
            </div>
            
            <div className="w-48 h-48 bg-white border-2 border-[#25D366]/30 relative flex flex-col items-center justify-center p-2 mt-4 shadow-[4px_4px_0_rgba(37,211,102,0.1)]">
              <img src="/image.png" alt="WhatsApp Group QR Code" className="max-w-full max-h-full object-contain mx-auto block" />
            </div>
            
            <p className="text-xs text-on-surface-variant text-center max-w-[80%] uppercase tracking-widest leading-relaxed">
              Scan this code with your device to join the official alert channel.
            </p>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            key="step6"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col gap-6 items-center justify-center h-full min-h-[350px]"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
              className="w-24 h-24 bg-primary/20 rounded-none flex items-center justify-center border-2 border-primary mb-4 shadow-[8px_8px_0_0_rgba(255,124,245,0.4)]"
            >
              <span className="material-symbols-outlined text-5xl text-primary">check</span>
            </motion.div>
            
            <div className="text-center">
              <h2 className="text-3xl font-headline font-black text-on-surface uppercase tracking-tight neon-glow-primary mb-4">Registration Locked</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm mx-auto font-body uppercase tracking-wider">
                We are waiting to see you at the event! Your squad's credentials have been safely received.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-secondary animate-pulse"></span>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                  Prepare for deployment
                </span>
                <span className="w-2 h-2 bg-secondary animate-pulse"></span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 bg-surface-container-highest border border-outline-variant hover:border-primary text-white hover:text-primary px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all"
            >
              Close Terminal
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={
              shake 
                ? { x: [-5, 5, -5, 5, 0], opacity: 1, scale: 1, y: 0 } 
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-surface-container border border-outline-variant/30 shadow-2xl rounded-xl overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-on-surface-variant hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-surface-container-highest">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: '16.6%' }}
                animate={{ width: `${(step / 6) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content Area */}
            <div className="p-8 relative min-h-[400px] flex flex-col">
              
              <div className="flex-1 overflow-hidden relative">
                <AnimatePresence custom={direction} mode="wait">
                  {renderStep()}
                </AnimatePresence>
              </div>

              {/* Navigation Footer */}
              {step < 6 && (
                <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-outline-variant/30">
                  {submitError && (
                    <p className="text-error text-xs uppercase tracking-widest text-center">{submitError}</p>
                  )}
                  <div className="flex justify-between items-center">
                    {step > 1 ? (
                      <button
                        onClick={prevStep}
                        disabled={isSubmitting}
                        className="text-sm font-bold text-on-surface-variant hover:text-white uppercase tracking-wider transition-colors disabled:opacity-40"
                      >
                        Return
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      onClick={step === 4 ? handleSubmit : nextStep}
                      disabled={isSubmitting}
                      className="bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-none text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(255,255,255,0.4)] active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? 'Transmitting...' : step === 3 ? 'Deploy Payment' : step === 5 ? 'Finish' : 'Proceed'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
