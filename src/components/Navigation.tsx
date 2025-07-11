
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Plus, Home, Package } from "lucide-react";

interface NavigationProps {
  onCreateClick: () => void;
  onHomeClick: () => void;
  onPackagesClick: () => void;
  currentView: 'home' | 'packages' | 'detail';
}

export const Navigation = ({ onCreateClick, onHomeClick, onPackagesClick, currentView }: NavigationProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={onCreateClick} className="gap-2">
            <Plus className="h-4 w-4" />
            Create
          </Button>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant={currentView === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={onHomeClick}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button
              variant={currentView === 'packages' ? 'default' : 'ghost'}
              size="sm"
              onClick={onPackagesClick}
              className="gap-2"
            >
              <Package className="h-4 w-4" />
              Packages
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold hidden sm:block">Python Script Manager</h1>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="gap-2"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">
              {isDark ? 'Light' : 'Dark'}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
