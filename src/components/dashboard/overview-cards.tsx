'use client';
import { memo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Power, Gauge, Zap, Map, Thermometer } from 'lucide-react';

const overviewData = [
  {
    title: 'Status',
    value: 'Parked',
    unit: 'Vehicle not in use',
    icon: Power,
  },
  {
    title: 'Battery SoC',
    value: '72',
    unit: '%',
    icon: Zap,
  },
  {
    title: 'Est. Range',
    value: '110',
    unit: 'km',
    icon: Map,
  },
  {
    title: 'Ambient Temp.',
    value: '32',
    unit: '°C',
    icon: Thermometer,
  },
];

function OverviewCards() {
  return (
    <>
      {overviewData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {item.title === 'Status' ? (
              <>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default memo(OverviewCards);
