
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface CreateScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    code: string;
    variables: string[];
    duration: string;
  }) => void;
  initialData?: {
    name: string;
    code: string;
    variables: string[];
    duration: string;
  };
}

export const CreateScriptModal = ({ isOpen, onClose, onSubmit, initialData }: CreateScriptModalProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [code, setCode] = useState(initialData?.code || '');
  const [variables, setVariables] = useState<string[]>(initialData?.variables || []);
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [newVariable, setNewVariable] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !duration) return;
    
    onSubmit({ name, code, variables, duration });
    
    // Reset form
    setName('');
    setCode('');
    setVariables([]);
    setDuration('');
    setNewVariable('');
  };

  const addVariable = () => {
    if (newVariable && !variables.includes(newVariable)) {
      setVariables([...variables, newVariable]);
      setNewVariable('');
    }
  };

  const removeVariable = (variable: string) => {
    setVariables(variables.filter(v => v !== variable));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addVariable();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {initialData ? 'Edit Script' : 'Create New Script'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Script Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter script name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Python Script</Label>
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your Python script here..."
              className="min-h-[200px] font-mono text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Dependencies/Variables</Label>
            <div className="flex gap-2">
              <Input
                value={newVariable}
                onChange={(e) => setNewVariable(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., requests, pandas, numpy"
              />
              <Button type="button" onClick={addVariable} variant="outline">
                Add
              </Button>
            </div>
            {variables.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {variables.map((variable) => (
                  <Badge key={variable} variant="secondary" className="gap-1">
                    {variable}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeVariable(variable)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Duration</Label>
            <Select value={duration} onValueChange={setDuration} required>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10min">10 minutes</SelectItem>
                <SelectItem value="1hour">1 hour</SelectItem>
                <SelectItem value="24hours">24 hours</SelectItem>
                <SelectItem value="24/7">24/7 (Continuous)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Script' : 'Create Script'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
