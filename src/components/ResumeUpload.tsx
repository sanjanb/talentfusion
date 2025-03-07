
import React, { useState } from 'react';
import { Upload, Loader2, FileText, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  confidence: number;
}

const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<Skill[]>([]);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file',
        variant: 'destructive',
      });
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/extract_skills', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract skills');
      }

      const data = await response.json();
      setExtractedSkills(data.skills);
      toast({
        title: 'Success',
        description: 'Skills extracted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to extract skills. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upload Resume</h2>
        <FileText className="text-blue-500" size={24} />
      </div>

      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="text-blue-500" size={24} />
          <span className="text-sm text-gray-500">
            {file ? file.name : 'Click to upload your resume (PDF)'}
          </span>
        </label>
      </div>

      {file && (
        <Button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full"
          variant="default"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting Skills...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Extract Skills
            </>
          )}
        </Button>
      )}

      {extractedSkills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Extracted Skills</h3>
          <div className="flex flex-wrap gap-2">
            {extractedSkills.map((skill, index) => (
              <div
                key={index}
                className={cn(
                  "px-3 py-1 rounded-full text-sm",
                  "bg-blue-100 dark:bg-blue-900",
                  "text-blue-700 dark:text-blue-300"
                )}
              >
                {skill.name}
                {skill.confidence && (
                  <span className="ml-1 opacity-60">
                    {Math.round(skill.confidence * 100)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
