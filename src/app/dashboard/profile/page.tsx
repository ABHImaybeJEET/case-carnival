'use client';
import { memo } from 'react';
import RiderProfile from '@/components/dashboard/rider-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
            <div className="grid gap-1">
              <CardTitle className="text-2xl">User</CardTitle>
              <p className="text-sm text-muted-foreground">
                user@swadesigo.com
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="destructive">Logout</Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <RiderProfile />
      </div>
    </div>
  );
}

export default memo(ProfilePage);
