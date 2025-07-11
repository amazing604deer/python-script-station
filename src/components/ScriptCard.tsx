
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Eye, Clock, Calendar } from "lucide-react";
import { Script } from "@/pages/Index";

interface ScriptCardProps {
  script: Script;
  onToggle: () => void;
  onView: () => void;
}

export const ScriptCard = ({ script, onToggle, onView }: ScriptCardProps) => {
  const getDurationDisplay = (duration: string) => {
    switch (duration) {
      case '10min': return '10 minutes';
      case '1hour': return '1 hour';
      case '24hours': return '24 hours';
      case '24/7': return '24/7';
      default: return duration;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {script.name}
          </CardTitle>
          <Badge variant={script.status === 'active' ? 'default' : 'secondary'}>
            {script.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {getDurationDisplay(script.duration)}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(script.createdAt)}
          </div>
        </div>

        {script.variables.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Dependencies:</p>
            <div className="flex flex-wrap gap-1">
              {script.variables.slice(0, 3).map((variable) => (
                <Badge key={variable} variant="outline" className="text-xs">
                  {variable}
                </Badge>
              ))}
              {script.variables.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{script.variables.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            onClick={onToggle}
            variant={script.status === 'active' ? 'destructive' : 'default'}
            size="sm"
            className="flex-1 gap-2"
          >
            {script.status === 'active' ? (
              <>
                <Square className="h-4 w-4" />
                Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button onClick={onView} variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
