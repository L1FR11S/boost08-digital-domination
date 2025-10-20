import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePageTracking } from "@/hooks/usePageTracking";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SolutionsOverview from "./pages/solutions/SolutionsOverview";
import SmartPresenceSolution from "./pages/solutions/SmartPresenceSolution";
import ReputationSolution from "./pages/solutions/ReputationSolution";
import SocialMediaSolution from "./pages/solutions/SocialMediaSolution";
import LocalSEOSolution from "./pages/solutions/LocalSEOSolution";
import HealthcareSolution from "./pages/industry/HealthcareSolution";
import BeautySolution from "./pages/industry/BeautySolution";
import RetailSolution from "./pages/industry/RetailSolution";
import RestaurantSolution from "./pages/industry/RestaurantSolution";
import ResultsOverview from "./pages/results/ResultsOverview";
import CaseStudyDetail from "./pages/results/CaseStudyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const AppContent = () => {
  usePageTracking();
  
  return (
    <>
      <Toaster />
      <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Solution pages - De 4 kärnpelarna */}
          <Route path="/losningar">
            <Route index element={<SolutionsOverview />} />
            <Route path="smart-narvarohantering" element={<SmartPresenceSolution />} />
            <Route path="intelligent-rykteshantering" element={<ReputationSolution />} />
            <Route path="social-media-automatisering" element={<SocialMediaSolution />} />
            <Route path="lokalt-seo" element={<LocalSEOSolution />} />
          </Route>
          
          {/* Industry-specific pages */}
          <Route path="/bransch">
            <Route path="kliniker-vard" element={<HealthcareSolution />} />
            <Route path="skonhetssalonger" element={<BeautySolution />} />
            <Route path="butikskedjor" element={<RetailSolution />} />
            <Route path="restauranger-cafeer" element={<RestaurantSolution />} />
          </Route>
          
          {/* Results & Social Proof */}
          <Route path="/resultat">
            <Route index element={<ResultsOverview />} />
            <Route path=":slug" element={<CaseStudyDetail />} />
          </Route>
          
          {/* Other pages */}
          <Route path="/om-oss" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
