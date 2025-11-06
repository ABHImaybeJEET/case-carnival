import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { vehicleComponents } from '@/lib/data';

export default function RulPrediction() {
  const getProgressColor = (value: number) => {
    if (value < 25) return 'bg-destructive';
    if (value < 50) return 'bg-yellow-500';
    return 'bg-primary';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictive Maintenance</CardTitle>
        <CardDescription>Remaining Useful Life (RUL)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {vehicleComponents.map((component) => (
          <div key={component.name}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <component.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{component.name}</span>
              </div>
              <span className="text-sm font-semibold">{component.rul}%</span>
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
