
import React, { useState, useEffect } from 'react';
import { Pencil, Download, FileDown, LinkedinIcon, Copy, RefreshCw, Save, PlusCircle, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AnimatedButton from './ui/AnimatedButton';
import ResumeUpload from './ResumeUpload';
import { ScaleLoader } from 'react-spinners';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock Firebase functions for demonstration
const fetchPortfolioData = async (userId: string) => {
  // In a real app, this would fetch data from Firebase
  return new Promise(resolve => {
    setTimeout(() => resolve(null), 500);
  });
};

const savePortfolioData = async (userId: string, data: any) => {
  // In a real app, this would save data to Firebase
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 500);
  });
};

interface PortfolioSection {
  title: string;
  items: string[];
}

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
          setSections(data.sections || sections);
          setResumeText(data.resumeText || resumeText);
          setLinkedinSummary(data.linkedinSummary || linkedinSummary);
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

  const handleEdit = (sectionKey: string) => {
    setEditingSection(sectionKey);
  };

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
      await savePortfolioData(userId, {
        sections,
        resumeText,
        linkedinSummary
      });
      
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

  const handleDownload = (type: 'resume' | 'linkedin', format: 'pdf' | 'docx') => {
    // This is a placeholder. In a real app, you would generate and download the actual file
    toast({
      title: "Download Started",
      description: `Your ${type === 'resume' ? 'resume' : 'LinkedIn summary'} is being downloaded as ${format.toUpperCase()}.`,
    });
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `Your ${type} has been copied to clipboard.`,
    });
  };

  const renderEditableSection = (sectionKey: string, section: PortfolioSection) => {
    const isEditing = editingSection === sectionKey;
    const [editableItems, setEditableItems] = useState([...section.items]);
    
    const handleItemChange = (index: number, value: string) => {
      const newItems = [...editableItems];
      newItems[index] = value;
      setEditableItems(newItems);
    };
    
    const handleAddItem = () => {
      setEditableItems([...editableItems, ""]);
    };
    
    const handleRemoveItem = (index: number) => {
      setEditableItems(editableItems.filter((_, i) => i !== index));
    };

    return (
      <Card className="mb-5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>{section.title}</CardTitle>
            {!isEditing ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit(sectionKey)}
                className="text-gray-500 hover:text-blue-500"
                aria-label={`Edit ${section.title}`}
              >
                <Pencil size={16} />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingSection(null)}
                  className="text-red-500"
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => handleSave(sectionKey, editableItems)}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <ScaleLoader height={15} width={2} color="#ffffff" />
                      <span className="ml-2">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-1" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
          <CardDescription>
            {section.title === "Skills" && "List your technical and soft skills"}
            {section.title === "Projects" && "Showcase your portfolio projects"}
            {section.title === "Experience" && "Your work history and accomplishments"}
            {section.title === "Education" && "Academic qualifications and certifications"}
            {section.title === "Certifications" && "Professional certifications and courses"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <ul className="space-y-2">
              {section.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1 text-blue-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3">
              {editableItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddItem}
                className="mt-2"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
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
              {renderEditableSection('skills', sections.skills)}
            </TabsContent>
            
            <TabsContent value="experience">
              {renderEditableSection('experience', sections.experience)}
            </TabsContent>
            
            <TabsContent value="education">
              {renderEditableSection('education', sections.education)}
            </TabsContent>
            
            <TabsContent value="projects">
              {renderEditableSection('projects', sections.projects)}
            </TabsContent>
            
            <TabsContent value="certifications">
              {renderEditableSection('certifications', sections.certifications)}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <ResumeUpload />
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Generated Content</h2>
        <Separator className="mb-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resume Summary</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard(resumeText, "resume summary")}
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </Button>
              </div>
              <CardDescription>Professional summary for your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4 max-h-40 overflow-y-auto">
                <p className="text-gray-700 dark:text-gray-300">{resumeText}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <AnimatedButton
                variant="outline"
                size="sm"
                onClick={() => handleDownload('resume', 'pdf')}
                animation="scale"
              >
                <FileDown size={16} />
                PDF
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="sm"
                onClick={() => handleDownload('resume', 'docx')}
                animation="scale"
              >
                <Download size={16} />
                DOCX
              </AnimatedButton>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>LinkedIn Summary</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard(linkedinSummary, "LinkedIn summary")}
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </Button>
              </div>
              <CardDescription>Professional summary for your LinkedIn profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4 max-h-40 overflow-y-auto">
                <p className="text-gray-700 dark:text-gray-300">{linkedinSummary}</p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2 w-full">
                <LinkedinIcon size={20} className="text-blue-500" />
                <span className="text-sm text-gray-500">Ready to add to your LinkedIn profile</span>
                <Button variant="ghost" size="sm" className="ml-auto" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-1" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-6">
          <AnimatedButton
            variant="primary"
            className="w-full"
            onClick={handleGenerateResumeSummaries}
            disabled={isGenerating}
            animation="scale"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating Summaries...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Professional Summaries
              </>
            )}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
