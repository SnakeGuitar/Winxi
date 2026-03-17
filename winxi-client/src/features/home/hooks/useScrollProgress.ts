import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress for the home page collage effect.
 * @param threshold The scroll distance (in px) at which progress reaches 1.0.
 * @returns { scrollProgress, scrollOpacity, scrollTranslateX }
 */
export const useScrollProgress = (threshold = 180) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(1, window.scrollY / threshold);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollOpacity = 1 - scrollProgress;
  const scrollTranslateX = scrollProgress * 120;

  return {
    scrollProgress,
    scrollOpacity,
    scrollTranslateX,
  };
};
