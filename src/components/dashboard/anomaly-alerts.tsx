'use client';

import { useState, useTransition, memo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Bot, Loader2, History, ShieldAlert, Bell } from 'lucide-react';
import { anomalies, maintenanceHistory } from '@/lib/data';
import type { Anomaly } from '@/lib/types';
import { explainAnomaly } from '@/ai/flows/explain-anomaly-detection';
import { summarizeVehicleMaintenanceHistory } from '@/ai/flows/summarize-vehicle-maintenance-history';
import { useToast } from '@/hooks/use-toast';

type AnomalyExplanation = {
  explanation: string;
  importance: string;
  recommendedActions: string;
};

function AnomalyAlerts() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [explanation, setExplanation] = useState<AnomalyExplanation | null>(
    null
  );
  const [isExplanationPending, startExplanationTransition] = useTransition();
  const { toast } = useToast();

  const handleAnomalyClick = (anomaly: Anomaly) => {
    setSelectedAnomaly(anomaly);
    setExplanation(null);
    startExplanationTransition(async () => {
      const result = await explainAnomaly(anomaly);
      if (result) {
        setExplanation(result);
      } else {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not generate anomaly explanation.',
        });
      }
    });
  };

  const getSeverityBadge = (severity: 'Low' | 'Medium' | 'High') => {
    switch (severity) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="size-5" />
          <CardTitle>Anomaly Alerts</CardTitle>
        </div>
        <CardDescription>
          Critical warnings and AI-powered insights about your vehicle.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <button
                key={anomaly.id}
                className="w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted"
                onClick={() => handleAnomalyClick(anomaly)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 flex-shrink-0 text-destructive" />
                    <div>
                      <p className="font-semibold">{anomaly.anomalyType}</p>
                      <p className="text-sm text-muted-foreground">
                        {anomaly.component} - {anomaly.timestamp}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getSeverityBadge(anomaly.severity)}>
                    {anomaly.severity}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <Sheet
        open={!!selectedAnomaly}
        onOpenChange={(isOpen) => !isOpen && setSelectedAnomaly(null)}
      >
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Anomaly Details</SheetTitle>
            <SheetDescription>
              AI-powered explanation of the detected issue.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            {isExplanationPending || !explanation ? (
              <div className="flex min-h-[200px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-primary">Explanation</h4>
                  <p className="text-sm text-muted-foreground">
                    {explanation.explanation}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Importance</h4>
                  <p className="text-sm text-muted-foreground">
                    {explanation.importance}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">
                    Recommended Actions
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {explanation.recommendedActions}
                  </p>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}

export default memo(AnomalyAlerts);
