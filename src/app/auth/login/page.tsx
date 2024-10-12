"use client"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
    <div className="flex w-full h-screen items-center justify-center bg-black">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <Image
              src="/marker-icon2.png"
              alt=""
              height={80}
              width={80}
            />
            <span className="text-2xl font-bold text-center">Welcome to Mini Bus TRACKER</span></CardTitle>
          <CardDescription className="text-center">First Mini Bus tracker in Montalban Rizal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 flex justify-end">
            <Button onClick={async()=>await signIn('google')}>Continue with Google</Button>
          </div>
        </CardContent>
        {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
      </Card>
    </div>
    </>
  );
}
