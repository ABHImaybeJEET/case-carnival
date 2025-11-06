'use client';
import { memo } from 'react';
import RulPrediction from '@/components/dashboard/rul-prediction';

function MaintenancePage() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <RulPrediction />
    </div>
  );
}

export default memo(MaintenancePage);
