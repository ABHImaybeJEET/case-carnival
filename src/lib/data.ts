import type { VehicleComponent, Anomaly, NavItem } from '@/lib/types';
import {
  BatteryFull,
  Disc3,
  LayoutDashboard,
  UserCircle,
  Wrench,
  Cpu,
  CircuitBoard,
} from 'lucide-react';
import { TireIcon } from '@/components/icons/tire';

export const vehicleComponents: VehicleComponent[] = [
  {
    name: 'Battery Health',
    rul: 82,
    icon: BatteryFull,
    replacementSuggestion: 'Expected to last another 2 years under normal use.',
  },
  {
    name: 'Motor',
    rul: 95,
    icon: Cpu,
    replacementSuggestion: 'Motor is in excellent condition. No replacement needed soon.',
  },
  {
    name: 'Controller',
    rul: 92,
    icon: CircuitBoard,
    replacementSuggestion: 'Controller is functioning optimally.',
  },
  {
    name: 'Brake Pads',
    rul: 45,
    icon: Disc3,
    replacementSuggestion: 'Consider replacement in the next 4-6 months.',
  },
  {
    name: 'Front Tire',
    rul: 68,
    icon: TireIcon,
    replacementSuggestion: 'Tread depth is good. Check again in 8-10 months.',
  },
  {
    name: 'Rear Tire',
    rul: 75,
    icon: TireIcon,
    replacementSuggestion: 'Tread depth is excellent. Check again in 12 months.',
  },
];

export const anomalies: Anomaly[] = [
  {
    id: '1',
    component: 'Battery',
    anomalyType: 'Unusual Voltage Drop',
    severity: 'Medium',
    timestamp: '2024-07-29 14:30:15',
    sensorData: 'Voltage dropped from 54.2V to 51.1V under moderate load.',
  },
  {
    id: '2',
    component: 'Motor',
    anomalyType: 'Overheating',
    severity: 'High',
    timestamp: '2024-07-29 11:15:00',
    sensorData: 'Motor temperature reached 95°C. Threshold is 90°C.',
  },
  {
    id: '3',
    component: 'Brakes',
    anomalyType: 'Sensor Malfunction',
    severity: 'Low',
    timestamp: '2024-07-28 09:05:45',
    sensorData: 'Rear brake pressure sensor reporting intermittent signal loss.',
  },
];

export const navItems: NavItem[] = [
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: UserCircle,
    description: 'Manage your profile and analyze your riding habits.',
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: "Here's your vehicle's intelligent overview.",
  },
  {
    href: '/dashboard/maintenance',
    label: 'Maintenance',
    icon: Wrench,
    description: 'View the Remaining Useful Life (RUL) of key components.',
  },
];

export const historicalSpeedData =
  [60, 62, 65, 58, 70, 75, 72, 68, 65, 63].join(', ');
export const historicalAccelerationData =
  [2.5, 3.0, 2.8, 2.2, 3.5, 3.8, 3.1, 2.9, 2.6, 2.4].join(', ');
export const maintenanceHistory = `
- 2024-06-15: Regular check-up. All systems normal. Tire pressure adjusted.
- 2024-03-10: Replaced front brake pads. Fluid levels checked.
- 2023-12-05: Software update v2.1.3 installed. Battery diagnostics run, SoH at 95%.
- 2023-09-20: Rear tire replaced due to puncture.
`;
