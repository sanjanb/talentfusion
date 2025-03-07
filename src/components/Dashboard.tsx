
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart2, 
  Briefcase, 
  BookOpen, 
  FileText, 
  ArrowRight,
  Code,
  Database,
  Globe,
  Server,
  Layout,
  Github,
  Cpu
} from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";
import SkillRadar from "./SkillRadar";
import JobCard from "./JobCard";
import PortfolioPreview from "./PortfolioPreview";
import SkillGapAnalysis from "./SkillGapAnalysis";

const sampleSkills = [
  { name: "JavaScript", value: 85, category: "Programming" },
  { name: "React", value: 75, category: "Frontend" },
  { name: "Node.js", value: 60, category: "Backend" },
  { name: "TypeScript", value: 70, category: "Programming" },
  { name: "UI/UX", value: 65, category: "Design" },
  { name: "Python", value: 40, category: "Programming" },
  { name: "DevOps", value: 35, category: "Infrastructure" },
  { name: "Databases", value: 55, category: "Backend" }
];

const sampleJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2 days ago",
    matchScore: 92,
    skills: ["React", "TypeScript", "Redux", "Tailwind CSS"]
  },
  {
    title: "Full Stack Engineer",
    company: "InnovateTech",
    location: "Remote",
    type: "Full-time",
    posted: "1 week ago",
    matchScore: 85,
    skills: ["JavaScript", "Node.js", "MongoDB", "React"]
  },
  {
    title: "UI/UX Developer",
    company: "DesignHub",
    location: "New York, NY",
    type: "Contract",
    posted: "3 days ago",
    matchScore: 78,
    skills: ["Figma", "React", "CSS", "User Testing"]
  }
];

const sampleProjects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and kanban board interface.",
    technologies: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
    githubUrl: "#",
    demoUrl: "#"
  }
];

const skillGapData = [
  { name: "React", currentLevel: 75, requiredLevel: 90, category: "Frontend" },
  { name: "TypeScript", currentLevel: 70, requiredLevel: 85, category: "Programming" },
  { name: "Redux", currentLevel: 65, requiredLevel: 80, category: "Frontend" },
  { name: "Node.js", currentLevel: 60, requiredLevel: 70, category: "Backend" },
  { name: "Testing", currentLevel: 40, requiredLevel: 75, category: "Quality Assurance" },
  { name: "GraphQL", currentLevel: 30, requiredLevel: 60, category: "API" }
];

interface DashboardProps {
  className?: string;
}

const Dashboard = ({ className }: DashboardProps) => {
  return (
    <div className={cn("container py-8 px-4 md:px-6 max-w-7xl mx-auto animate-fade-in", className)}>
      <div className="flex flex-col lg:flex-row justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your career progress and discover new opportunities
          </p>
        </div>
        
        <div className="flex space-x-4">
          <AnimatedButton
            variant="secondary"
            className="gap-2"
          >
            <FileText size={16} />
            <span>Update Profile</span>
          </AnimatedButton>
          
          <AnimatedButton
            variant="primary"
            animation="scale"
            className="gap-2"
          >
            <Briefcase size={16} />
            <span>Find Jobs</span>
          </AnimatedButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="glass-card p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Skill Overview</h2>
          <div className="flex justify-center">
            <SkillRadar skills={sampleSkills} size={250} />
          </div>
          
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
            {["Frontend", "Backend", "Design", "DevOps"].map((category, i) => (
              <div 
                key={i} 
                className="glass-light p-3 flex items-center justify-center flex-col text-center"
              >
                {i === 0 && <Layout size={16} className="mb-1.5 text-blue-500" />}
                {i === 1 && <Server size={16} className="mb-1.5 text-blue-500" />}
                {i === 2 && <Cpu size={16} className="mb-1.5 text-blue-500" />}
                {i === 3 && <Globe size={16} className="mb-1.5 text-blue-500" />}
                <span className="text-sm font-medium">{category}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <AnimatedButton
              variant="ghost"
              className="w-full justify-center"
            >
              <BarChart2 size={16} className="mr-2" />
              Detailed Skill Analysis
            </AnimatedButton>
          </div>
        </div>
        
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recommended Jobs</h2>
            <Link 
              to="/jobs" 
              className="text-sm text-blue-600 dark:text-blue-400 flex items-center hover:underline"
            >
              View all
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="space-y-6">
            {sampleJobs.slice(0, 2).map((job, i) => (
              <JobCard key={i} {...job} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SkillGapAnalysis
          skills={skillGapData}
          targetRole="Senior Frontend Developer"
        />
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Learning Recommendations</h2>
          
          <div className="space-y-4">
            {[
              {
                title: "Advanced React Patterns",
                provider: "Frontend Masters",
                progress: 65,
                icon: <Code size={16} className="text-blue-500" />
              },
              {
                title: "TypeScript for React Developers",
                provider: "Udemy",
                progress: 30,
                icon: <Code size={16} className="text-blue-500" />
              },
              {
                title: "GraphQL Fundamentals",
                provider: "Apollo",
                progress: 10,
                icon: <Database size={16} className="text-blue-500" />
              }
            ].map((course, i) => (
              <div key={i} className="glass-light p-4">
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-3">{course.icon}</div>
                    <div>
                      <h3 className="font-medium mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{course.provider}</p>
                    </div>
                  </div>
                  <span className="pill bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    Recommended
                  </span>
                </div>
                
                <div className="mt-3">
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{course.progress}% Complete</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400">Continue</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <AnimatedButton
              variant="secondary"
              className="w-full justify-center"
              animation="scale"
            >
              <BookOpen size={16} className="mr-2" />
              View Learning Path
            </AnimatedButton>
          </div>
        </div>
      </div>
      
      <div>
        <PortfolioPreview projects={sampleProjects} />
      </div>
    </div>
  );
};

export default Dashboard;
