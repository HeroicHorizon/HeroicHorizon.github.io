import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Global visual FX layer:
 *  - scroll progress bar (top)
 *  - cursor "flashlight" glow that follows the pointer
 *  - per-card spotlight: sets --mx/--my on the hovered .glass-card so its
 *    background radial illuminates toward the cursor
 *
 * Pointer effects are skipped for touch devices and when the user prefers
 * reduced motion. The scroll bar is always shown (not motion-sickness inducing).
 */
export default function FxLayer() {
  const glowRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;

    const glow = glowRef.current;
    let raf = 0;
    let px = -1000;
    let py = -1000;
    let lastCard = null;

    const flush = () => {
      raf = 0;
      if (glow) {
        glow.style.transform = `translate(${px}px, ${py}px)`;
        glow.style.opacity = '1';
      }
    };

    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;

      const card = e.target.closest ? e.target.closest('.glass-card') : null;
      if (card !== lastCard) {
        if (lastCard) {
          lastCard.style.removeProperty('--mx');
          lastCard.style.removeProperty('--my');
        }
        lastCard = card;
      }
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      if (glow) glow.style.opacity = '0';
      if (lastCard) {
        lastCard.style.removeProperty('--mx');
        lastCard.style.removeProperty('--my');
        lastCard = null;
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <motion.div id="scroll-progress" style={{ scaleX }} />
      <div id="cursor-glow" ref={glowRef} aria-hidden="true" />
    </>
  );
}
