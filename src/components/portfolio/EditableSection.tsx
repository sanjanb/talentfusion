
import React, { useState } from 'react';
import { Pencil, Save, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ScaleLoader } from 'react-spinners';
import { PortfolioSection } from '@/types/portfolio';

interface EditableSectionProps {
  sectionKey: string;
  section: PortfolioSection;
  onSave: (sectionKey: string, items: string[]) => void;
  isSaving: boolean;
}

const EditableSection = ({ sectionKey, section, onSave, isSaving }: EditableSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableItems([...section.items]);
    setIsEditing(false);
  };

  const handleSaveSection = () => {
    onSave(sectionKey, editableItems);
    setIsEditing(false);
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
              onClick={handleEdit}
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
                onClick={handleCancel}
                className="text-red-500"
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleSaveSection}
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

export default EditableSection;
