import OverviewCards from '@/components/dashboard/overview-cards';
import RangePrediction from '@/components/dashboard/range-prediction';
import RulPrediction from '@/components/dashboard/rul-prediction';
import AnomalyAlerts from '@/components/dashboard/anomaly-alerts';
import RiderProfile from '@/components/dashboard/rider-profile';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="col-span-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-3">
        <OverviewCards />
      </div>

      <div className="col-span-1 flex flex-col gap-6 lg:col-span-2">
        <RangePrediction />
        <AnomalyAlerts />
      </div>

      <div className="col-span-1 flex flex-col gap-6">
        <RulPrediction />
        <RiderProfile />
      </div>
    </div>
  );
}
