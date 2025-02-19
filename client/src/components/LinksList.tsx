import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DASHBOARD_URLS } from '@/lib/config';
import { ExternalLink } from 'lucide-react';

export function LinksList() {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Dashboard Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {DASHBOARD_URLS.filter(dash => dash.id !== 'links').map((dashboard) => (
          <div key={dashboard.id} className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {dashboard.title}
              <a 
                href={dashboard.loginUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </h3>
            <p className="text-sm text-muted-foreground break-all">
              {dashboard.loginUrl}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
