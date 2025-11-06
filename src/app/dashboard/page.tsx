'use client';

import { memo } from 'react';
import OverviewCards from '@/components/dashboard/overview-cards';
import RangePrediction from '@/components/dashboard/range-prediction';
import RulPrediction from '@/components/dashboard/rul-prediction';
import AnomalyAlerts from '@/components/dashboard/anomaly-alerts';

function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="col-span-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-4">
        <OverviewCards />
      </div>

      <div className="col-span-1 flex flex-col gap-6 lg:col-span-2">
        <RangePrediction />
      </div>

      <div className="col-span-1 flex flex-col gap-6 lg:col-span-2">
        <RulPrediction />
      </div>

      <div className="col-span-1 flex flex-col gap-6 lg:col-span-4">
        <AnomalyAlerts />
      </div>
    </div>
  );
}

export default memo(DashboardPage);
