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
import { Bot, Loader2, BarChart3, UserCircle } from 'lucide-react';
import { generateRiderProfileSummary } from '@/ai/flows/generate-rider-profile-summary';
import { historicalSpeedData, historicalAccelerationData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

function RiderProfile() {
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
          AI-powered analysis of your driving habits.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isPending ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-muted-foreground">{summary}</p>
            </div>
          </div>
        )}
      </CardContent>
      {summary && !isPending && (
        <CardFooter>
          <Button onClick={handleAnalyze} disabled={isPending} className="w-full">
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
