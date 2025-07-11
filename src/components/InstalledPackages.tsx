
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Trash2, RefreshCw } from "lucide-react";
import { Script } from "@/pages/Index";

interface InstalledPackagesProps {
  scripts: Script[];
}

export const InstalledPackages = ({ scripts }: InstalledPackagesProps) => {
  // Get all unique packages from all scripts
  const getAllPackages = () => {
    const packageMap = new Map<string, string[]>();
    
    scripts.forEach(script => {
      script.variables.forEach(variable => {
        if (!packageMap.has(variable)) {
          packageMap.set(variable, []);
        }
        packageMap.get(variable)!.push(script.name);
      });
    });
    
    return Array.from(packageMap.entries()).map(([pkg, usedBy]) => ({
      name: pkg,
      usedBy
    }));
  };

  const packages = getAllPackages();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Installed Packages</h1>
        <p className="text-muted-foreground">
          Manage Python packages used across your scripts
        </p>
      </div>

      {packages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mb-4">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No packages installed</h3>
              <p className="text-muted-foreground">
                Create scripts with dependencies to see installed packages here
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5" />
                  {pkg.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">
                    Used by {pkg.usedBy.length} script{pkg.usedBy.length !== 1 ? 's' : ''}:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {pkg.usedBy.map((scriptName) => (
                      <Badge key={scriptName} variant="outline" className="text-xs">
                        {scriptName}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reinstall
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Package Management Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Packages are automatically installed when you create or update scripts</p>
          <p>• Removing a package will affect all scripts that depend on it</p>
          <p>• Use reinstall if you're experiencing package-related issues</p>
          <p>• Each script runs in its own isolated environment</p>
        </CardContent>
      </Card>
    </div>
  );
};
