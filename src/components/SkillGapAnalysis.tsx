
import React from "react";
import { cn } from "@/lib/utils";
import { BookOpen, BarChart2 } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";

interface Skill {
  name: string;
  currentLevel: number;
  requiredLevel: number;
  category: string;
}

interface SkillGapAnalysisProps {
  skills: Skill[];
  targetRole: string;
  className?: string;
}

const SkillGapAnalysis = ({
  skills,
  targetRole,
  className
}: SkillGapAnalysisProps) => {
  // Calculate overall gap score (0-100)
  const calculateOverallGap = () => {
    if (skills.length === 0) return 0;
    
    const totalGap = skills.reduce((acc, skill) => {
      const gap = Math.max(0, skill.requiredLevel - skill.currentLevel);
      return acc + gap;
    }, 0);
    
    const maxPossibleGap = skills.length * 100;
    const gapPercentage = (totalGap / maxPossibleGap) * 100;
    
    // Invert so higher is better (less gap)
    return Math.round(100 - gapPercentage);
  };
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
  
  return (
    <div className={cn("glass-card p-6", className)}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Skill Gap Analysis</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Compare your skills with requirements for: <span className="font-medium text-gray-800 dark:text-gray-200">{targetRole}</span>
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Match Score</p>
            <p className="text-3xl font-semibold text-blue-600 dark:text-blue-400">{calculateOverallGap()}%</p>
          </div>
          <div className="ml-3 w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <div 
              className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center"
              style={{
                background: `conic-gradient(rgb(59 130 246) ${calculateOverallGap()}%, transparent 0)`
              }}
            >
              <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-lg font-medium mb-3">{category}</h3>
            <div className="space-y-4">
              {categorySkills.map((skill, i) => (
                <div key={i} className="glass-light p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.currentLevel}% / {skill.requiredLevel}%
                    </p>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${skill.currentLevel}%` }}
                    />
                    <div 
                      className="h-full rounded-full bg-gray-400 dark:bg-gray-600 mt-[-8px] opacity-40"
                      style={{ 
                        width: `${skill.requiredLevel}%`, 
                        clipPath: `inset(0 0 0 ${skill.currentLevel}%)` 
                      }}
                    />
                  </div>
                  
                  {skill.currentLevel < skill.requiredLevel && (
                    <div className="mt-3 flex items-center">
                      <BookOpen size={14} className="text-blue-500 mr-1.5" />
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        {`Improve by ${skill.requiredLevel - skill.currentLevel}%`}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between">
        <AnimatedButton
          variant="ghost"
          className="text-gray-600 dark:text-gray-300"
        >
          <BarChart2 size={16} className="mr-2" />
          Detailed Analysis
        </AnimatedButton>
        
        <AnimatedButton
          variant="primary"
          animation="scale"
        >
          <BookOpen size={16} className="mr-2" />
          Get Learning Plan
        </AnimatedButton>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;
