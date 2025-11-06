import RiderProfile from '@/components/dashboard/rider-profile';
import AnomalyAlerts from '@/components/dashboard/anomaly-alerts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="flex-row items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src="https://picsum.photos/seed/user/64/64" data-ai-hint="profile person" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>User</CardTitle>
              <p className="text-sm text-muted-foreground">
                user@swadesigo.com
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Welcome to your intelligent vehicle management platform. Here, you
              can find personalized insights and critical alerts about your
              e-ride.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <AnomalyAlerts />
      </div>

      <div className="lg:col-span-3">
        <RiderProfile />
      </div>
    </div>
  );
}
