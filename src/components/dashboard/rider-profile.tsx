'use client';

import { useState, useTransition, memo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, Lightbulb, UserCircle } from 'lucide-react';
import { generateRiderProfileSummary } from '@/ai/flows/generate-rider-profile-summary';
import { historicalSpeedData, historicalAccelerationData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import type { GenerateRiderProfileSummaryOutput } from '@/ai/flows/generate-rider-profile-summary';

function RiderProfile() {
  const [analysis, setAnalysis] =
    useState<GenerateRiderProfileSummaryOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalyze = () => {
    startTransition(async () => {
      const result = await generateRiderProfileSummary({
        historicalSpeedData,
        historicalAccelerationData,
      });

      if (result?.riderProfileSummary) {
        setAnalysis(result);
      } else {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not generate rider profile summary.',
        });
      }
    });
  };

  useEffect(() => {
    handleAnalyze();
  }, []);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserCircle className="size-5" />
          <CardTitle>Rider Profile Analysis</CardTitle>
        </div>
        <CardDescription>
          AI-powered analysis of your driving habits and personalized
          suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isPending && !analysis ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : analysis ? (
          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-muted-foreground">
                {analysis.riderProfileSummary}
              </p>
            </div>
            {analysis.suggestions && (
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary" />
                  <h4 className="font-semibold">Suggestions for You</h4>
                </div>
                <p className="whitespace-pre-line text-muted-foreground">
                  {analysis.suggestions}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
      {analysis && !isPending && (
        <CardFooter>
          <Button
            onClick={handleAnalyze}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Re-analyzing...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Re-analyze Profile
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default memo(RiderProfile);
