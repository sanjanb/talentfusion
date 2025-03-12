
import React, { useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import ResumeUpload from './ResumeUpload';
import EditableSection from './portfolio/EditableSection';
import GeneratedContent from './portfolio/GeneratedContent';
import { PortfolioData, PortfolioSection } from '@/types/portfolio';
import { fetchPortfolioData, savePortfolioData } from '@/services/portfolioService';

const Portfolio = () => {
  const { toast } = useToast();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string>("Your professional summary will appear here after generation.");
  const [linkedinSummary, setLinkedinSummary] = useState<string>("Your LinkedIn summary will appear here after generation.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [sections, setSections] = useState<{[key: string]: PortfolioSection}>({
    skills: {
      title: "Skills",
      items: ["JavaScript", "React", "TypeScript", "Node.js", "CSS", "HTML", "Git"]
    },
    projects: {
      title: "Projects",
      items: ["Personal Portfolio Website", "E-commerce Platform", "Task Management App"]
    },
    experience: {
      title: "Experience",
      items: ["Frontend Developer at XYZ Company (2020-Present)", "Web Developer Intern at ABC Corp (2019-2020)"]
    },
    education: {
      title: "Education",
      items: ["Bachelor of Computer Science, University of Technology (2016-2020)"]
    },
    certifications: {
      title: "Certifications",
      items: ["AWS Certified Developer", "Google Cloud Professional Developer"]
    }
  });

  // Fetch portfolio data on component mount
  useEffect(() => {
    const loadPortfolioData = async () => {
      setIsLoading(true);
      try {
        const userId = "current-user-id"; // In a real app, get this from auth context
        const data = await fetchPortfolioData(userId);
        
        if (data) {
          // Update state with fetched data
          setSections(data.sections);
          setResumeText(data.resumeText);
          setLinkedinSummary(data.linkedinSummary);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load portfolio data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  const handleSave = async (sectionKey: string, newItems: string[]) => {
    setIsSaving(true);
    
    // Update local state
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        items: newItems
      }
    }));
    
    // Save to Firebase
    try {
      const userId = "current-user-id"; // In a real app, get this from auth context
      const portfolioData: PortfolioData = {
        sections,
        resumeText,
        linkedinSummary
      };
      
      await savePortfolioData(userId, portfolioData);
      
      setEditingSection(null);
      
      toast({
        title: "Saved",
        description: `Your ${sections[sectionKey].title.toLowerCase()} have been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateResumeSummaries = async () => {
    setIsGenerating(true);
    
    // In a real application, this would call an API endpoint to generate summaries
    setTimeout(() => {
      setResumeText("Dynamic and creative Frontend Developer with 3+ years of experience building responsive web applications. Proficient in JavaScript, React, and TypeScript with a strong focus on creating intuitive user experiences and accessible interfaces.");
      
      setLinkedinSummary("Frontend Developer passionate about creating engaging user experiences. Experienced in modern JavaScript frameworks, particularly React. Constantly learning and applying new technologies to solve complex problems and deliver exceptional digital products.");
      
      setIsGenerating(false);
      
      toast({
        title: "Generated",
        description: "Your resume and LinkedIn summaries have been generated.",
      });
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto py-8 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ScaleLoader color="#3b82f6" height={35} width={4} radius={2} margin={2} />
          <p className="mt-4 text-gray-500">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Showcase your professional skills and accomplishments
        </p>
        <Separator className="mt-4" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="skills" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills">
              <EditableSection 
                sectionKey="skills" 
                section={sections.skills} 
                onSave={handleSave}
                isSaving={isSaving}
              />
            </TabsContent>
            
            <TabsContent value="experience">
              <EditableSection 
                sectionKey="experience" 
                section={sections.experience} 
                onSave={handleSave}
                isSaving={isSaving}
              />
            </TabsContent>
            
            <TabsContent value="education">
              <EditableSection 
                sectionKey="education" 
                section={sections.education} 
                onSave={handleSave}
                isSaving={isSaving}
              />
            </TabsContent>
            
            <TabsContent value="projects">
              <EditableSection 
                sectionKey="projects" 
                section={sections.projects} 
                onSave={handleSave}
                isSaving={isSaving}
              />
            </TabsContent>
            
            <TabsContent value="certifications">
              <EditableSection 
                sectionKey="certifications" 
                section={sections.certifications} 
                onSave={handleSave}
                isSaving={isSaving}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <ResumeUpload />
        </div>
      </div>
      
      <GeneratedContent 
        resumeText={resumeText}
        linkedinSummary={linkedinSummary}
        isGenerating={isGenerating}
        onGenerate={handleGenerateResumeSummaries}
      />
    </div>
  );
};

export default Portfolio;
