import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useFullPageScroll hook
 * Manages scroll snapping, current section tracking, and
 * programmatic navigation between full-page sections.
 */
export function useFullPageScroll(sectionCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);

  // Scroll to a specific section index
  const scrollToSection = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll('[data-fullpage-section]');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveIndex(index);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use IntersectionObserver to track which section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sections = Array.from(
              container.querySelectorAll('[data-fullpage-section]')
            );
            const idx = sections.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    const sections = container.querySelectorAll('[data-fullpage-section]');
    sections.forEach((s) => observer.observe(s));

    // Wheel-based snapping (one step per wheel event)
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;
      setTimeout(() => { isScrolling.current = false; }, 800);

      setActiveIndex((prev) => {
        const next = e.deltaY > 0
          ? Math.min(prev + 1, sectionCount - 1)
          : Math.max(prev - 1, 0);
        const secs = container.querySelectorAll('[data-fullpage-section]');
        if (secs[next]) {
          secs[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return next;
      });
    };

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      if (isScrolling.current) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 30) return; // ignore tiny swipes
      isScrolling.current = true;
      setTimeout(() => { isScrolling.current = false; }, 800);
      setActiveIndex((prev) => {
        const next = dy > 0
          ? Math.min(prev + 1, sectionCount - 1)
          : Math.max(prev - 1, 0);
        const secs = container.querySelectorAll('[data-fullpage-section]');
        if (secs[next]) {
          secs[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return next;
      });
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = Math.min(prev + 1, sectionCount - 1);
          const secs = container.querySelectorAll('[data-fullpage-section]');
          if (secs[next]) secs[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
          return next;
        });
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          const secs = container.querySelectorAll('[data-fullpage-section]');
          if (secs[next]) secs[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
          return next;
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sectionCount]);

  return { containerRef, activeIndex, scrollToSection };
}
