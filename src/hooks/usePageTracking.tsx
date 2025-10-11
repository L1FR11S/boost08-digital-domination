import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analytics';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname, document.title);

    // Track time on page
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      if (timeSpent > 5) {
        // Only track if user spent more than 5 seconds
        // trackTimeOnPage(timeSpent, location.pathname);
      }
    };
  }, [location]);
};
