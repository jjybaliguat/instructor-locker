"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const session = useSession()

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-foreground">Profile</h2>

      <Card className="max-w-xl bg-background border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Account Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label className="text-muted-foreground">Name</Label>
            <p className="text-base text-foreground">{session.data?.user.instructor?.name}</p>
          </div>
          <Separator />

          <div>
            <Label className="text-muted-foreground">Email</Label>
            <p className="text-base text-foreground">{session.data?.user.email}</p>
          </div>
          <Separator />

          <div>
            <Label className="text-muted-foreground">Role</Label>
            <p className="text-base text-foreground">{session.data?.user.role}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
