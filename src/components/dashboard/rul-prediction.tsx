'use client';
import { memo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { vehicleComponents } from '@/lib/data';
import { Wrench } from 'lucide-react';

function RulPrediction() {
  const getProgressColor = (value: number) => {
    if (value < 25) return 'bg-destructive';
    if (value < 50) return 'bg-yellow-500';
    return 'bg-primary';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="size-5" />
          <CardTitle>Predictive Maintenance</CardTitle>
        </div>
        <CardDescription>Remaining Useful Life (RUL) of key components.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {vehicleComponents.map((component) => (
          <div key={component.name}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <component.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{component.name}</span>
              </div>
              <span className="font-semibold">{component.rul}%</span>
            </div>
            <Progress
              value={component.rul}
              indicatorClassName={getProgressColor(component.rul)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default memo(RulPrediction);
