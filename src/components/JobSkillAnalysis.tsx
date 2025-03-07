
import React, { useState, useEffect } from "react";
import { Search, Book, Briefcase, ChevronRight, BookOpen, BarChart2, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SkillGapAnalysis from "@/components/SkillGapAnalysis";
import { useStore } from "@/store/useStore";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface JobSkillAnalysisProps {
  className?: string;
}

const JobSkillAnalysis = ({ className }: JobSkillAnalysisProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [skillGapAnalysis, setSkillGapAnalysis] = useState<any>(null);
  
  // Get user skills from global state
  const userSkills = useStore(state => state.skills);
  const addRecentSearch = useStore(state => state.addRecentSearch);
  const saveJob = useStore(state => state.saveJob);
  
  // Load initial jobs
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const jobsData = await api.jobs.getAll();
        setJobs(jobsData);
        
        // Load learning resources
        const resourcesData = await api.learning.getAll();
        setResources(resourcesData);
        
        // Select first job by default
        if (jobsData.length > 0) {
          setSelectedJobId(jobsData[0].id);
          
          // Run skill gap analysis
          const analysis = await api.skillGap.analyze(
            userSkills.map(s => ({ name: s.name, level: s.level })),
            jobsData[0].id
          );
          setSkillGapAnalysis(analysis);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error",
          description: "Failed to load job data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, [userSkills, toast]);
  
  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await api.jobs.search(searchQuery);
      setJobs(results);
      addRecentSearch(searchQuery);
      
      // Clear search field
      setSearchQuery("");
      
      toast({
        title: "Search completed",
        description: `Found ${results.length} matching jobs`
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Could not complete your search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle job selection
  const handleJobSelect = async (jobId: string) => {
    setSelectedJobId(jobId);
    
    setIsLoading(true);
    try {
      const analysis = await api.skillGap.analyze(
        userSkills.map(s => ({ name: s.name, level: s.level })),
        jobId
      );
      setSkillGapAnalysis(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze skill gap. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle save job
  const handleSaveJob = (job: any) => {
    saveJob(job);
    toast({
      title: "Job saved",
      description: `${job.title} has been saved to your profile.`
    });
  };
  
  // Get selected job
  const selectedJob = jobs.find(job => job.id === selectedJobId) || null;
  
  // Transform data for SkillGapAnalysis component
  const transformedSkills = skillGapAnalysis?.gaps.map((gap: any) => ({
    name: gap.name,
    currentLevel: gap.currentLevel,
    requiredLevel: gap.requiredLevel,
    category: gap.name.includes("React") || gap.name.includes("CSS") || gap.name.includes("UI") 
      ? "Frontend" 
      : gap.name.includes("Node") || gap.name.includes("Database") || gap.name.includes("AWS") 
        ? "Backend" 
        : "General"
  })) || [];

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
      {/* Search Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-6">Skill Gap Analysis</h1>
        <div className="relative max-w-xl">
          <Input
            type="text"
            placeholder="Search for job titles or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            size={18} 
          />
          <Button 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
        
        {/* Quick Job Matches */}
        <div className="mt-6 flex flex-wrap gap-3">
          {jobs.map((job) => (
            <Button
              key={job.id}
              variant={job.id === selectedJobId ? "default" : "outline"}
              className="group relative"
              onClick={() => handleJobSelect(job.id)}
            >
              <span className="mr-2">{job.title}</span>
              <span className="text-sm text-blue-500">
                {job.id === selectedJobId && skillGapAnalysis 
                  ? `${skillGapAnalysis.match}%` 
                  : "Match"}
              </span>
              <span 
                className={`absolute inset-0 ${
                  job.id === selectedJobId 
                    ? "bg-blue-500/20" 
                    : "bg-blue-500/0 group-hover:bg-blue-500/10"
                } transition-all rounded-md`} 
              />
            </Button>
          ))}
        </div>
      </div>

      {/* Skill Gap Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {selectedJob && skillGapAnalysis ? (
            <SkillGapAnalysis
              skills={transformedSkills}
              targetRole={selectedJob.title}
              className="h-full"
            />
          ) : (
            <div className="glass-card flex items-center justify-center p-10 h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading skill analysis...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Learning Resources */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
          <div className="space-y-4">
            {resources.slice(0, 3).map((resource) => (
              <div key={resource.id} className="glass-light p-4 transition-all hover:translate-y-[-2px]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{resource.title}</h3>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                    {resource.skill}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {resource.provider} • {resource.duration} • {resource.level}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    <Star size={12} className="inline mr-1" /> 4.8/5
                  </span>
                  <AnimatedButton variant="ghost" className="justify-start" size="sm">
                    <BookOpen size={14} className="mr-1.5" />
                    View Course
                  </AnimatedButton>
                </div>
              </div>
            ))}
          </div>
          
          {selectedJob && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col gap-3">
                <AnimatedButton
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => handleSaveJob(selectedJob)}
                >
                  <span className="flex items-center">
                    <Briefcase size={16} className="mr-2" />
                    Save This Job
                  </span>
                  <ChevronRight size={16} />
                </AnimatedButton>
                
                <AnimatedButton
                  variant="primary"
                  className="w-full justify-between"
                  animation="scale"
                >
                  <span className="flex items-center">
                    <Book size={16} className="mr-2" />
                    Get Learning Plan
                  </span>
                  <ChevronRight size={16} />
                </AnimatedButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSkillAnalysis;
