
import React from 'react';
import { Copy, FileDown, Download, LinkedinIcon, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useToast } from '@/hooks/use-toast';

interface GeneratedContentProps {
  resumeText: string;
  linkedinSummary: string;
  isGenerating: boolean;
  onGenerate: () => void;
}

const GeneratedContent = ({ resumeText, linkedinSummary, isGenerating, onGenerate }: GeneratedContentProps) => {
  const { toast } = useToast();

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `Your ${type} has been copied to clipboard.`,
    });
  };

  const handleDownload = (type: 'resume' | 'linkedin', format: 'pdf' | 'docx') => {
    // This is a placeholder. In a real app, you would generate and download the actual file
    toast({
      title: "Download Started",
      description: `Your ${type === 'resume' ? 'resume' : 'LinkedIn summary'} is being downloaded as ${format.toUpperCase()}.`,
    });
  };

  return (
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
          onClick={onGenerate}
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
  );
};

export default GeneratedContent;
