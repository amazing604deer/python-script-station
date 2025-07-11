
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CreateScriptModal } from "@/components/CreateScriptModal";
import { ScriptCard } from "@/components/ScriptCard";
import { ScriptDetailView } from "@/components/ScriptDetailView";
import { InstalledPackages } from "@/components/InstalledPackages";

export interface Script {
  id: string;
  name: string;
  code: string;
  variables: string[];
  duration: string;
  status: 'active' | 'inactive';
  createdAt: string;
  logs: string[];
}

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'packages'>('home');

  const handleCreateScript = (scriptData: Omit<Script, 'id' | 'status' | 'createdAt' | 'logs'>) => {
    const newScript: Script = {
      ...scriptData,
      id: Date.now().toString(),
      status: 'inactive',
      createdAt: new Date().toISOString(),
      logs: []
    };
    setScripts(prev => [...prev, newScript]);
    setIsCreateModalOpen(false);
  };

  const handleToggleScript = (scriptId: string) => {
    setScripts(prev => prev.map(script => 
      script.id === scriptId 
        ? { ...script, status: script.status === 'active' ? 'inactive' : 'active' }
        : script
    ));
  };

  const handleEditScript = (scriptId: string, updatedData: Partial<Script>) => {
    setScripts(prev => prev.map(script => 
      script.id === scriptId 
        ? { ...script, ...updatedData }
        : script
    ));
  };

  if (selectedScript) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          onCreateClick={() => setIsCreateModalOpen(true)}
          onHomeClick={() => setSelectedScript(null)}
          onPackagesClick={() => setCurrentView('packages')}
          currentView="detail"
        />
        <ScriptDetailView 
          script={selectedScript}
          onBack={() => setSelectedScript(null)}
          onEdit={(updatedScript) => {
            handleEditScript(selectedScript.id, updatedScript);
            setSelectedScript({...selectedScript, ...updatedScript});
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onCreateClick={() => setIsCreateModalOpen(true)}
        onHomeClick={() => setCurrentView('home')}
        onPackagesClick={() => setCurrentView('packages')}
        currentView={currentView}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Your Scripts</h1>
              <p className="text-muted-foreground">Manage and run your Python scripts effortlessly</p>
            </div>
            
            {scripts.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🐍</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No scripts yet</h3>
                  <p className="text-muted-foreground mb-6">Create your first Python script to get started</p>
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Create Your First Script
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scripts.map(script => (
                  <ScriptCard
                    key={script.id}
                    script={script}
                    onToggle={() => handleToggleScript(script.id)}
                    onView={() => setSelectedScript(script)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <InstalledPackages scripts={scripts} />
        )}
      </main>

      <CreateScriptModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateScript}
      />
    </div>
  );
};

export default Index;
