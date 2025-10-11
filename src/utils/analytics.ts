// Google Analytics 4 Event Tracking Utilities

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Type-safe event tracking
export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Conversion Events
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent({
    action: 'conversion',
    category: 'engagement',
    label: conversionType,
    value,
  });
};

// CTA Click Tracking
export const trackCTAClick = (ctaText: string, location: string) => {
  trackEvent({
    action: 'cta_click',
    category: 'cta',
    label: `${ctaText} - ${location}`,
  });
};

// Form Submission Tracking
export const trackFormSubmission = (formName: string) => {
  trackEvent({
    action: 'form_submission',
    category: 'form',
    label: formName,
  });
};

// Page View Tracking (enhanced)
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-PLVH21LRJS', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Solution Page Visit
export const trackSolutionView = (solutionName: string) => {
  trackEvent({
    action: 'solution_view',
    category: 'solutions',
    label: solutionName,
  });
};

// Industry Page Visit
export const trackIndustryView = (industryName: string) => {
  trackEvent({
    action: 'industry_view',
    category: 'industry',
    label: industryName,
  });
};

// Case Study View
export const trackCaseStudyView = (caseStudySlug: string) => {
  trackEvent({
    action: 'case_study_view',
    category: 'results',
    label: caseStudySlug,
  });
};

// Video Play (if you add demo videos)
export const trackVideoPlay = (videoTitle: string) => {
  trackEvent({
    action: 'video_play',
    category: 'engagement',
    label: videoTitle,
  });
};

// Scroll Depth Tracking
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100) => {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
  });
};

// Time on Page (call when user leaves)
export const trackTimeOnPage = (seconds: number, pageName: string) => {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    label: pageName,
    value: seconds,
  });
};

// External Link Click
export const trackExternalLinkClick = (linkUrl: string) => {
  trackEvent({
    action: 'external_link_click',
    category: 'outbound',
    label: linkUrl,
  });
};

// Search Interaction (if you add search)
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: resultsCount,
  });
};

// ROI Calculator Usage
export const trackROICalculatorUsage = (industry: string) => {
  trackEvent({
    action: 'roi_calculator_use',
    category: 'tools',
    label: industry,
  });
};

// Navigation Menu Interaction
export const trackNavigation = (menuItem: string) => {
  trackEvent({
    action: 'navigation_click',
    category: 'navigation',
    label: menuItem,
  });
};
