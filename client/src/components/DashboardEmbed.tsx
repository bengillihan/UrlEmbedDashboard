import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface DashboardEmbedProps {
  url: string;
  title: string;
  loginUrl: string;
}

export function DashboardEmbed({ url, title, loginUrl }: DashboardEmbedProps) {
  const handleOpenDashboard = () => {
    window.open(loginUrl, '_blank', 'noopener,noreferrer');
  };

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