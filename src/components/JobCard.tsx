
import React from "react";
import { cn } from "@/lib/utils";
import { Briefcase, MapPin, Clock, Award } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  logo?: string;
  matchScore: number;
  skills: string[];
  className?: string;
}

const JobCard = ({
  title,
  company,
  location,
  type,
  posted,
  logo,
  matchScore,
  skills,
  className
}: JobCardProps) => {
  // Determine color based on match score
  const getMatchColor = () => {
    if (matchScore >= 90) return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    if (matchScore >= 70) return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
  };
  
  return (
    <div 
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:shadow-hover border border-gray-100 dark:border-gray-800",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {logo ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 bg-white shadow-subtle flex items-center justify-center">
              <img src={logo} alt={company} className="w-10 h-10 object-contain" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4 flex items-center justify-center">
              <Briefcase size={20} />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{company}</p>
          </div>
        </div>
        
        <div className={cn("pill font-medium text-xs rounded-md px-2 py-1", getMatchColor())}>
          <Award size={12} className="mr-1" />
          {matchScore}% Match
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <MapPin size={14} className="mr-1" />
          {location}
        </div>
        <div className="flex items-center">
          <Briefcase size={14} className="mr-1" />
          {type}
        </div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          {posted}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="pill bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <AnimatedButton
          variant="ghost"
          size="sm"
          className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
        >
          Save
        </AnimatedButton>
        
        <AnimatedButton
          variant="primary"
          size="sm"
          animation="scale"
        >
          View Details
        </AnimatedButton>
      </div>
    </div>
  );
};

export default JobCard;
