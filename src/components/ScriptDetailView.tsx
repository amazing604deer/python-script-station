
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Play, Square, Terminal, Code, Package, Clock } from "lucide-react";
import { Script } from "@/pages/Index";
import { CreateScriptModal } from "./CreateScriptModal";

interface ScriptDetailViewProps {
  script: Script;
  onBack: () => void;
  onEdit: (updatedScript: Partial<Script>) => void;
}

export const ScriptDetailView = ({ script, onBack, onEdit }: ScriptDetailViewProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(script.status === 'active');

  const handleToggleScript = () => {
    setIsRunning(!isRunning);
    onEdit({ status: isRunning ? 'inactive' : 'active' });
  };

  const handleEditSubmit = (updatedData: Omit<Script, 'id' | 'status' | 'createdAt' | 'logs'>) => {
    onEdit(updatedData);
    setIsEditModalOpen(false);
  };

  const getDurationDisplay = (duration: string) => {
    switch (duration) {
      case '10min': return '10 minutes';
      case '1hour': return '1 hour';
      case '24hours': return '24 hours';
      case '24/7': return '24/7';
      default: return duration;
    }
  };

  // Mock console logs for demonstration
  const mockLogs = [
    "Script initialized successfully",
    "Loading dependencies...",
    "Dependencies loaded: " + script.variables.join(", "),
    "Executing main function...",
    isRunning ? "Script is running..." : "Script stopped",
    ...(isRunning ? [
      "Processing data...",
      "Task completed successfully",
      "Waiting for next iteration..."
    ] : [])
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <Button onClick={onBack} variant="ghost" className="gap-2 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Scripts
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{script.name}</h1>
            <p className="text-muted-foreground mt-1">
              Created on {new Date(script.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => setIsEditModalOpen(true)} variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              onClick={handleToggleScript}
              variant={isRunning ? 'destructive' : 'default'}
              className="gap-2"
            >
              {isRunning ? (
                <>
                  <Square className="h-4 w-4" />
                  Stop Script
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Script
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Script Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Script Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant={isRunning ? 'default' : 'secondary'}>
                  {isRunning ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Duration:</span>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  {getDurationDisplay(script.duration)}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <span className="text-sm font-medium flex items-center gap-1 mb-2">
                  <Package className="h-4 w-4" />
                  Dependencies ({script.variables.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {script.variables.length > 0 ? (
                    script.variables.map((variable) => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {variable}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No dependencies</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Script Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto max-h-64 overflow-y-auto">
                  {script.code}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Console Output */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Console Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-96 max-h-96 overflow-y-auto">
                {mockLogs.map((log, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-gray-500">
                      [{new Date().toLocaleTimeString()}]
                    </span>{" "}
                    {log}
                  </div>
                ))}
                {isRunning && (
                  <div className="mt-2 animate-pulse">
                    <span className="text-gray-500">
                      [{new Date().toLocaleTimeString()}]
                    </span>{" "}
                    <span className="bg-green-400 text-black px-1">█</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateScriptModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={{
          name: script.name,
          code: script.code,
          variables: script.variables,
          duration: script.duration
        }}
      />
    </div>
  );
};
