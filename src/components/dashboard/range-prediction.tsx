'use client';
import { memo } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  BatteryMedium,
  Mountain,
  TrafficCone,
  Thermometer,
  User,
  Map,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const rangeFactors = [
  { label: 'Battery', value: '72%', icon: BatteryMedium },
  { label: 'Topography', value: 'Hilly', icon: Mountain },
  { label: 'Traffic', value: 'Light', icon: TrafficCone },
  { label: 'Temp.', value: '32°C', icon: Thermometer },
  { label: 'Rider Profile', value: 'Eco', icon: User },
];

function RangePrediction() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-background');

  return (
    <Card className="relative flex flex-col overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Map className="size-5" />
          <CardTitle>Dynamic Range Prediction</CardTitle>
        </div>
        <CardDescription>Estimated distance on current charge.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center p-0 md:flex-row">
        <div className="relative z-10 flex w-full flex-col items-center justify-center bg-background/50 p-6 text-center backdrop-blur-sm md:w-1/2 md:bg-transparent md:backdrop-blur-none">
          <div className="text-7xl font-bold tracking-tighter text-primary">
            110
          </div>
          <div className="text-2xl font-medium text-muted-foreground">
            Kilometers
          </div>
        </div>
        <div className="relative z-10 w-full bg-background/50 p-6 backdrop-blur-sm md:w-1/2 md:bg-card/80">
          <h4 className="mb-4 text-center font-semibold md:text-left">
            Influencing Factors
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 md:grid-cols-2">
            {rangeFactors.map((factor) => (
              <div key={factor.label} className="flex items-center gap-2">
                <factor.icon className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{factor.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {factor.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {mapImage && (
          <Image
            src={mapImage.imageUrl}
            alt={mapImage.description}
            fill
            className="object-cover opacity-5"
            data-ai-hint={mapImage.imageHint}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default memo(RangePrediction);
