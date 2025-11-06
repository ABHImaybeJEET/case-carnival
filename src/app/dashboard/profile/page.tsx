'use client';
import { memo } from 'react';
import RiderProfile from '@/components/dashboard/rider-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Mountain } from 'lucide-react';

function ProfilePage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="size-24">
              <AvatarImage
                src="https://picsum.photos/seed/user/96/96"
                data-ai-hint="profile person"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 py-2">
              <CardTitle className="text-2xl">User</CardTitle>
              <p className="text-sm text-muted-foreground">
                user@swadesigo.com
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="destructive">Logout</Button>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Leaf className="size-5" />
              <CardTitle>Green Impact</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mountain className="size-6 text-primary" />
                <div>
                  <p className="font-semibold">CO2 Saved</p>
                  <p className="text-sm text-muted-foreground">
                    Compared to a petrol vehicle
                  </p>
                </div>
              </div>
              <p className="text-lg font-bold">128 kg</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Leaf className="size-6 text-primary" />
                <div>
                  <p className="font-semibold">Trees Planted</p>
                  <p className="text-sm text-muted-foreground">
                    Equivalent environmental impact
                  </p>
                </div>
              </div>
              <p className="text-lg font-bold">5</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-2">
        <RiderProfile />
      </div>
    </div>
  );
}

export default memo(ProfilePage);
