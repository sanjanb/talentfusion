
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SkillGapAnalysis from "@/components/SkillGapAnalysis";

interface JobSkillAnalysisProps {
  className?: string;
}

const JobSkillAnalysis = ({ className }: JobSkillAnalysisProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Mock data for demonstration
  const mockSkills = [
    { name: "React", currentLevel: 80, requiredLevel: 90, category: "Frontend" },
    { name: "TypeScript", currentLevel: 75, requiredLevel: 85, category: "Frontend" },
    { name: "Node.js", currentLevel: 60, requiredLevel: 70, category: "Backend" },
    { name: "Python", currentLevel: 50, requiredLevel: 80, category: "Backend" },
    { name: "UI/UX Design", currentLevel: 70, requiredLevel: 75, category: "Design" },
    { name: "Figma", currentLevel: 65, requiredLevel: 70, category: "Design" }
  ];

  const mockJobs = [
    { title: "Senior Frontend Developer", company: "TechCo", match: 85 },
    { title: "Full Stack Engineer", company: "StartupX", match: 75 },
    { title: "UI Developer", company: "DesignLabs", match: 90 }
  ];

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
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        {/* Quick Job Matches */}
        <div className="mt-6 flex flex-wrap gap-3">
          {mockJobs.map((job, index) => (
            <Button
              key={index}
              variant="outline"
              className="group relative"
              onClick={() => setSelectedRole(job.title)}
            >
              <span className="mr-2">{job.title}</span>
              <span className="text-sm text-blue-500">{job.match}%</span>
              <span className="absolute inset-0 bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform rounded-md" />
            </Button>
          ))}
        </div>
      </div>

      {/* Skill Gap Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SkillGapAnalysis
            skills={mockSkills}
            targetRole={selectedRole || "Frontend Developer"}
            className="h-full"
          />
        </div>
        
        {/* Learning Resources */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
          <div className="space-y-4">
            <div className="glass-light p-4 transition-all hover:translate-y-[-2px]">
              <h3 className="font-medium mb-2">React Advanced Patterns</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Master advanced React concepts and patterns
              </p>
              <AnimatedButton variant="ghost" className="w-full justify-start">
                View Course
              </AnimatedButton>
            </div>
            
            <div className="glass-light p-4 transition-all hover:translate-y-[-2px]">
              <h3 className="font-medium mb-2">TypeScript Deep Dive</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Comprehensive TypeScript tutorial
              </p>
              <AnimatedButton variant="ghost" className="w-full justify-start">
                Start Learning
              </AnimatedButton>
            </div>
            
            <div className="glass-light p-4 transition-all hover:translate-y-[-2px]">
              <h3 className="font-medium mb-2">UI/UX Workshop</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Practical UI/UX design principles
              </p>
              <AnimatedButton variant="ghost" className="w-full justify-start">
                Join Workshop
              </AnimatedButton>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <AnimatedButton
              variant="primary"
              className="w-full"
              animation="scale"
            >
              View All Resources
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSkillAnalysis;
