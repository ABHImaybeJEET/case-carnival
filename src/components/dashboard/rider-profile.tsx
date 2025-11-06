'use client';

import { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, BarChart3 } from 'lucide-react';
import { generateRiderProfileSummary } from '@/ai/flows/generate-rider-profile-summary';
import { historicalSpeedData, historicalAccelerationData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function RiderProfile() {
  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalyze = () => {
    startTransition(async () => {
      const result = await generateRiderProfileSummary({
        historicalSpeedData,
        historicalAccelerationData,
      });

      if (result?.riderProfileSummary) {
        setSummary(result.riderProfileSummary);
      } else {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "Could not generate rider profile summary.",
        })
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rider Profile Analysis</CardTitle>
        <CardDescription>
          AI-powered analysis of your driving habits.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[120px]">
        {isPending ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : summary ? (
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 flex-shrink-0 text-accent" />
              <p className="text-muted-foreground">{summary}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
            <BarChart3 className="mb-2 h-8 w-8" />
            <p>Click "Analyze" to generate insights on your riding style.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalyze} disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              {summary ? 'Re-analyze Profile' : 'Analyze Profile'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
