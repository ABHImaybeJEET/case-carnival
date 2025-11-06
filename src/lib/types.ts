import type { LucideIcon } from 'lucide-react';
import type { SVGProps } from 'react';

export type VehicleComponent = {
  name: string;
  rul: number; // Remaining Useful Life in percentage
  icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element);
};

export type Anomaly = {
  id: string;
  component: string;
  anomalyType: string;
  severity: 'Low' | 'Medium' | 'High';
  timestamp: string;
  sensorData: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description?: string;
};
