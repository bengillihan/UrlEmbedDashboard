import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PowerBIEmbedProps {
  accessToken: string;
  embedUrl: string;
  reportId: string;
}

export function PowerBIEmbed({ accessToken, embedUrl, reportId }: PowerBIEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadPowerBI = async () => {
      try {
        // Get models. models contains enums that can be used.
        const models = (window as any)['powerbi-client'].models;

        // Create the embed configuration object for the report
        const config = {
          type: 'report',
          tokenType: models.TokenType.Embed,
          accessToken,
          embedUrl,
          id: reportId,
          permissions: models.Permissions.All,
          settings: {
            panes: {
              filters: {
                visible: true
              },
              pageNavigation: {
                visible: true
              }
            },
            bars: {
              statusBar: {
                visible: true
              }
            }
          }
        };

        // Get a reference to the Power BI JavaScript API
        const powerbi = (window as any).powerbi;
        
        // Embed the report
        const report = powerbi.embed(containerRef.current, config);

        report.on("error", (event: any) => {
          console.error("PowerBI Embed Error:", event.detail);
        });

        return () => {
          report.off("error");
          powerbi.reset(containerRef.current);
        };
      } catch (error) {
        console.error("Failed to load PowerBI:", error);
      }
    };

    loadPowerBI();
  }, [accessToken, embedUrl, reportId]);

  return (
    <Card className="w-full h-full">
      <CardContent className="p-0 h-full relative">
        <div id="embedContainer" ref={containerRef} className="h-full w-full" />
      </CardContent>
    </Card>
  );
}
