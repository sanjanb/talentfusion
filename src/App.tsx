
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

// Create dashboard page component
const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <Dashboard />
    </div>
  );
};

// Create portfolio page component (placeholder for now)
const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Your professional portfolio is being built. Check back soon for your complete showcase.
        </p>
        <div className="glass-card p-10 text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-medium mb-4">Under Construction</h2>
          <p className="max-w-md mx-auto text-gray-500 dark:text-gray-400">
            We're putting the finishing touches on your portfolio. 
            Come back soon to see your skills and projects beautifully showcased.
          </p>
        </div>
      </div>
    </div>
  );
};

// Create skills page component (placeholder for now)
const SkillsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Skills Analysis</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Detailed analysis of your skills and recommendations for improvement.
        </p>
        <div className="glass-card p-10 text-center">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-2xl font-medium mb-4">Coming Soon</h2>
          <p className="max-w-md mx-auto text-gray-500 dark:text-gray-400">
            Our AI is analyzing your skills. Soon you'll see a detailed breakdown of your strengths and areas for growth.
          </p>
        </div>
      </div>
    </div>
  );
};

// Create jobs page component (placeholder for now)
const JobsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Job Matches</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Jobs and opportunities matched to your skills and preferences.
        </p>
        <div className="glass-card p-10 text-center">
          <div className="text-6xl mb-6">💼</div>
          <h2 className="text-2xl font-medium mb-4">Job Matching in Progress</h2>
          <p className="max-w-md mx-auto text-gray-500 dark:text-gray-400">
            We're finding the perfect job matches for your unique profile. 
            Check back soon to discover opportunities tailored just for you.
          </p>
        </div>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
