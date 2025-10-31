import { useEffect, useState, useRef } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    let rafId: number;

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();
      
      const distance = Math.abs(currentScrollY - lastScrollY.current);
      const time = currentTimestamp - lastTimestamp.current;
      
      // Calculate velocity (pixels per millisecond)
      const currentVelocity = time > 0 ? distance / time : 0;
      
      // Smooth the velocity with exponential moving average
      setVelocity(prev => prev * 0.8 + currentVelocity * 0.2);
      
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTimestamp;
      
      rafId = requestAnimationFrame(updateVelocity);
    };

    rafId = requestAnimationFrame(updateVelocity);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Normalize velocity to a duration multiplier (0.3 to 1.5)
  // Fast scroll = shorter duration, slow scroll = longer duration
  const getDuration = (baseDuration: number = 0.5) => {
    const velocityFactor = Math.min(Math.max(velocity * 100, 0.3), 1.5);
    return baseDuration / (velocityFactor || 1);
  };

  return { velocity, getDuration };
}
