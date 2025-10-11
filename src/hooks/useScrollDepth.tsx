import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/utils/analytics';

export const useScrollDepth = () => {
  const depthsTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !depthsTracked.current.has(milestone)) {
          trackScrollDepth(milestone as 25 | 50 | 75 | 100);
          depthsTracked.current.add(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
