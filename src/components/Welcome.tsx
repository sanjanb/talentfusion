import React, { useState, useEffect } from "react";
import { ArrowRight, BrainCircuit, PieChart, Briefcase, Award } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Welcome = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    {
      icon: <BrainCircuit size={32} className="text-blue-500" />,
      title: "AI-Powered Skill Analysis",
      description: "Our advanced AI analyzes your skills and experience to create a comprehensive skill profile."
    },
    {
      icon: <PieChart size={32} className="text-blue-500" />,
      title: "Skill Gap Visualization",
      description: "Visualize the gap between your current skills and those required for your dream job."
    },
    {
      icon: <Briefcase size={32} className="text-blue-500" />,
      title: "Personalized Job Matching",
      description: "Get matched with opportunities that align perfectly with your unique skill set."
    },
    {
      icon: <Award size={32} className="text-blue-500" />,
      title: "Dynamic Portfolio Generation",
      description: "Automatically generate an impressive portfolio that showcases your abilities."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev === features.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen pt-20 px-6 md:px-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 section-fade-in">
            <div>
              <span className="pill bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                AI-Powered Career Platform
              </span>
              <h1 className="mt-6 mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover Your <br />
                <span className="text-blue-600 dark:text-blue-400">
                  Perfect Career Path
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                TalentFusion uses advanced AI to deeply understand your skills, generate a dynamic portfolio, and connect you with the perfect career opportunities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <AnimatedButton
                variant="primary"
                animation="scale"
                size="lg"
                className="sm:px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
              
              <Link to="/dashboard">
                <AnimatedButton
                  variant="secondary"
                  size="lg"
                  className="sm:px-8"
                >
                  Explore Demo
                </AnimatedButton>
              </Link>
            </div>
          </div>
          
          <div className="relative h-full px-8 hidden lg:block">
            <div className="relative glass-card p-6 h-[500px] overflow-hidden animate-float">
              <div className="absolute inset-0 bg-gradient-radial from-blue-50/40 to-transparent dark:from-blue-900/10 dark:to-transparent" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-1.5 bg-blue-500/40 rounded-full mb-8" />
                  <h3 className="text-2xl font-medium mb-6">Your Skill Radar</h3>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-64 h-64 relative">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <g className="fill-blue-600/10 dark:fill-blue-400/10 stroke-blue-600/80 dark:stroke-blue-400/80">
                        <path d="M100,10 L100,190 M10,100 L190,100 M35,35 L165,165 M35,165 L165,35" className="stroke-1 opacity-30" />
                        <circle cx="100" cy="100" r="90" className="fill-none stroke-2 opacity-50" />
                        <circle cx="100" cy="100" r="70" className="fill-none stroke-1 opacity-40" />
                        <circle cx="100" cy="100" r="50" className="fill-none stroke-1 opacity-30" />
                        <circle cx="100" cy="100" r="30" className="fill-none stroke-1 opacity-20" />
                        <path d="M100,100 L140,30 M100,100 L170,90 M100,100 L150,150 M100,100 L70,160 M100,100 L30,110" className="stroke-2" />
                        <circle cx="140" cy="30" r="4" className="fill-blue-600 dark:fill-blue-400 stroke-none animate-skill-pulse" />
                        <circle cx="170" cy="90" r="4" className="fill-blue-600 dark:fill-blue-400 stroke-none animate-skill-pulse" />
                        <circle cx="150" cy="150" r="4" className="fill-blue-600 dark:fill-blue-400 stroke-none animate-skill-pulse" />
                        <circle cx="70" cy="160" r="4" className="fill-blue-600 dark:fill-blue-400 stroke-none animate-skill-pulse" />
                        <circle cx="30" cy="110" r="4" className="fill-blue-600 dark:fill-blue-400 stroke-none animate-skill-pulse" />
                      </g>
                    </svg>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {['React', 'JavaScript', 'UI/UX', 'Node.js', 'Python'].map((skill, i) => (
                    <div key={i} className="pill bg-white/60 dark:bg-gray-800/60 text-center">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-12 -left-4 glass-light p-4 w-56 transform rotate-2 shadow-md animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="flex space-x-4 items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">95%</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Job Match</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Senior Developer</div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-10 -right-4 glass-light p-4 w-60 transform -rotate-1 shadow-md animate-float" style={{ animationDelay: "0.3s" }}>
              <div>
                <div className="font-medium">Recommended Course</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Advanced React Patterns</div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full">
                  <div className="bg-blue-500 h-1.5 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "glass-light p-6 transition-all duration-500", 
                currentFeature === index 
                  ? "transform scale-105 shadow-hover border-blue-200 dark:border-blue-900"
                  : "opacity-70"
              )}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
