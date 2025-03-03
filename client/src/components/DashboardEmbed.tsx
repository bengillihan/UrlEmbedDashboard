import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DashboardEmbedProps {
  url: string;
  title: string;
  loginUrl: string;
  openInNewWindow?: boolean;
  embedConfig?: {
    reportId: string;
    embedUrl: string;
    autoAuth?: boolean;
    ctid?: string;
  };
}

export function DashboardEmbed({ url, title, loginUrl, openInNewWindow = false, embedConfig }: DashboardEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);
  const { toast } = useToast();

  const handleLoad = () => {
    console.log(`${title} dashboard loaded successfully`);
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (event: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.error(`${title} dashboard error:`, event);
    setIsLoading(false);
    setHasError(true);
    toast({
      title: "Dashboard Error",
      description: `Failed to load ${title} dashboard. Please try refreshing or logging in again.`,
      variant: "destructive",
    });
  };

  const handleOpenDashboard = () => {
    const win = window.open(loginUrl, '_blank', 'noopener,noreferrer');
    if (win) {
      win.focus();
    }
  };

  const handleRefresh = () => {
    setKey(prev => prev + 1);
    setIsLoading(true);
    setHasError(false);
  };

  // Handle PowerBI embed directly
  if (embedConfig) {
    return (
      <Card className="w-full h-full">
        <CardContent className="p-0 h-full relative">
          {isLoading && (
            <div className="absolute inset-0 p-4">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <iframe
            key={key}
            title={title}
            width="100%"
            height="100%"
            src={url}
            frameBorder="0"
            allowFullScreen={true}
            onLoad={handleLoad}
            onError={handleError}
          />
        </CardContent>
      </Card>
    );
  }

  // For dashboards that need to open in a new window
  if (openInNewWindow) {
    return (
      <Card className="w-full h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
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
          allow="fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-popups-to-escape-sandbox allow-downloads allow-modals allow-presentation"
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
          importance="high"
        />
      </CardContent>
    </Card>
  );
}