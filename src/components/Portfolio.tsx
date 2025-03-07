
import React, { useState } from 'react';
import { Pencil, Download, FileDown, LinkedinIcon, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AnimatedButton from './ui/AnimatedButton';
import ResumeUpload from './ResumeUpload';

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

  const handleEdit = (sectionKey: string) => {
    setEditingSection(sectionKey);
  };

  const handleSave = (sectionKey: string, newItems: string[]) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        items: newItems
      }
    }));
    setEditingSection(null);
    
    toast({
      title: "Saved",
      description: `Your ${sections[sectionKey].title.toLowerCase()} have been updated.`,
    });
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
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {!isEditing ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleEdit(sectionKey)}
              className="text-gray-500 hover:text-blue-500"
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
              >
                Save
              </Button>
            </div>
          )}
        </div>
        
        {!isEditing ? (
          <ul className="list-disc pl-5 space-y-2">
            {section.items.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {editableItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddItem}
              className="mt-2"
            >
              Add Item
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Showcase your professional skills and accomplishments
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {Object.entries(sections).map(([key, section]) => (
            renderEditableSection(key, section)
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <ResumeUpload />
        </div>
      </div>
      
      <div className="space-y-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Resume Summary</h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopyToClipboard(resumeText, "resume summary")}
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
            <p className="text-gray-700 dark:text-gray-300">{resumeText}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={() => handleDownload('resume', 'pdf')}
              animation="scale"
            >
              <FileDown size={16} />
              Download PDF
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={() => handleDownload('resume', 'docx')}
              animation="scale"
            >
              <Download size={16} />
              Download DOCX
            </AnimatedButton>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">LinkedIn Summary</h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopyToClipboard(linkedinSummary, "LinkedIn summary")}
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
            <p className="text-gray-700 dark:text-gray-300">{linkedinSummary}</p>
          </div>
          <div className="flex items-center gap-2">
            <LinkedinIcon size={20} className="text-blue-500" />
            <span className="text-sm text-gray-500">Ready to add to your LinkedIn profile</span>
          </div>
        </div>
        
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
              Regenerate Summaries
            </>
          )}
        </AnimatedButton>
      </div>
    </div>
  );
};

export default Portfolio;
