/**
 * ScrollAnimations
 * ─────────────────────────────────────────────────────────
 * Uses GSAP + ScrollTrigger to apply:
 *  • pin:true  – section stays fixed while you scroll
 *  • scrub:1.5 – scroll position directly drives the animation (scrubbing)
 *
 * No extra content is added. We only animate what already exists.
 * ─────────────────────────────────────────────────────────
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    // gsap.context() scopes all animations to the document
    // and handles cleanup automatically when the component unmounts
    const ctx = gsap.context(() => {

      // ── 1. FEATURES SECTION ───────────────────────────────────────
      const featuresTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#features-section',
          pin: true,
          scrub: 0.5,         // snappier scrub
          start: 'top 80px',
          end: '+=700',       // shorter pin = feels faster
        },
      });

      featuresTl
        .from('#feat-card-1', { opacity: 0, x: -80, scale: 0.95, ease: 'power3.out', duration: 0.6 })
        .from('#feat-card-2', { opacity: 0, x:  80, scale: 0.95, ease: 'power3.out', duration: 0.6 }, '-=0.45')
        .from('#feat-card-3', { opacity: 0, y:  60, scale: 0.95, ease: 'power3.out', duration: 0.6 }, '-=0.45')
        .from('#feat-card-4', { opacity: 0, y:  60, scale: 0.92, ease: 'back.out(1.6)', duration: 0.6 }, '-=0.45');

      // ── 2. SCHEDULE SECTION ───────────────────────────────────────
      const scheduleTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#schedule',
          pin: true,
          scrub: 0.5,
          start: 'top 80px',
          end: '+=650',
        },
      });

      scheduleTl
        .from('#schedule-heading', { opacity: 0, y: -50, ease: 'power3.out', duration: 0.5 })
        .from('#schedule-day1',    { opacity: 0, x: -80, ease: 'power3.out', duration: 0.5 }, '-=0.3')
        .from('#schedule-day2',    { opacity: 0, x:  80, ease: 'power3.out', duration: 0.5 }, '-=0.35');

      // ── 3. PRIZES SECTION ─────────────────────────────────────────
      const prizesTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#prizes',
          pin: true,
          scrub: 0.5,
          start: 'top 80px',
          end: '+=650',
        },
      });

      prizesTl
        .from('#prizes-left', { opacity: 0, x: -80, ease: 'power3.out', duration: 0.5 })
        .from('#prizes-box',  { opacity: 0, scale: 0.78, y: 60, ease: 'back.out(1.8)', duration: 0.5 }, '-=0.3');

      // ── MICRO-INTERACTIONS ────────────────────────────────────────
      // Feature cards: subtle lift on scroll-enter (one-shot)
      gsap.utils.toArray(['#feat-card-1','#feat-card-2','#feat-card-3','#feat-card-4']).forEach((card) => {
        card.addEventListener('mouseenter', () =>
          gsap.to(card, { y: -6, scale: 1.02, duration: 0.25, ease: 'power2.out' })
        );
        card.addEventListener('mouseleave', () =>
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.inOut' })
        );
      });

      // Schedule day cards: glow border on hover
      gsap.utils.toArray(['#schedule-day1','#schedule-day2']).forEach((card) => {
        card.addEventListener('mouseenter', () =>
          gsap.to(card, { y: -4, duration: 0.2, ease: 'power2.out' })
        );
        card.addEventListener('mouseleave', () =>
          gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.inOut' })
        );
      });

      // Prize box: pulse scale on hover
      const prizesBox = document.querySelector('#prizes-box');
      if (prizesBox) {
        prizesBox.addEventListener('mouseenter', () =>
          gsap.to(prizesBox, { scale: 1.03, duration: 0.25, ease: 'power2.out' })
        );
        prizesBox.addEventListener('mouseleave', () =>
          gsap.to(prizesBox, { scale: 1, duration: 0.3, ease: 'power2.inOut' })
        );
      }

    });

    // Recalculate all positions after layout settles
    ScrollTrigger.refresh();

    return () => {
      ctx.revert(); // cleanly kills all timelines and scroll triggers
    };
  }, []);

  // Renders nothing — this component is purely a side-effect hook
  return null;
}
