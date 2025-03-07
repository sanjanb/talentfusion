
import React from "react";
import { cn } from "@/lib/utils";
import { GithubIcon, Code, FileCode, Eye } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
}

interface PortfolioPreviewProps {
  projects: Project[];
  className?: string;
}

const PortfolioPreview = ({ projects, className }: PortfolioPreviewProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Portfolio</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Showcase your best work to potential employers
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="glass-card overflow-hidden transition-all duration-300 hover:shadow-hover group"
          >
            <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <Code size={32} className="text-blue-400" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="pill bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-3 mt-4">
                {project.githubUrl && (
                  <AnimatedButton
                    variant="secondary"
                    size="sm"
                    animation="scale"
                    className="text-xs"
                  >
                    <GithubIcon size={14} className="mr-1.5" />
                    Code
                  </AnimatedButton>
                )}
                
                {project.demoUrl && (
                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    animation="scale"
                    className="text-xs"
                  >
                    <Eye size={14} className="mr-1.5" />
                    Live Demo
                  </AnimatedButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <AnimatedButton
          variant="secondary"
          className="mt-4"
          animation="scale"
        >
          <FileCode size={16} className="mr-2" />
          View Full Portfolio
        </AnimatedButton>
      </div>
    </div>
  );
};

export default PortfolioPreview;
