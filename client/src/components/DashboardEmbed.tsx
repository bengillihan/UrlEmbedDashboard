import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardEmbedProps {
  url: string;
  title: string;
  loginUrl: string;
  openInNewWindow?: boolean;
}

export function DashboardEmbed({ url, title, loginUrl, openInNewWindow = false }: DashboardEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleOpenDashboard = () => {
    window.open(loginUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRefresh = () => {
    setKey(prev => prev + 1);
    setIsLoading(true);
    setHasError(false);
  };

  if (openInNewWindow) {
    return (
      <Card className="w-full h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title} Dashboard</h3>
            <Button onClick={handleOpenDashboard} className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Open {title} in New Window
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardContent className="p-0 h-full relative">
        {isLoading && (
          <div className="absolute inset-0 p-4">
            <Skeleton className="w-full h-full" />
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Required</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please log in to {title} to view this dashboard
              </p>
              <Button onClick={handleOpenDashboard}>
                Open {title} Login Page
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                After logging in, return here and click refresh below
              </p>
              <Button 
                onClick={handleRefresh}
                variant="outline"
                className="mt-2"
              >
                Refresh Dashboard
              </Button>
            </div>
          </div>
        )}

        <iframe
          key={key}
          src={url}
          title={title}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          allow="fullscreen"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
        />
      </CardContent>
    </Card>
  );
}