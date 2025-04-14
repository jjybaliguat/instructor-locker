"use client"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
export default function LoginPage() {
  
  return (
    <>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center flex-col md:flex-row">
              <Image
                src="/logo.png"
                alt=""
                height={80}
                width={80}
              />
              <span className="text-2xl font-bold text-center">Welcome to Mini-Bus TRACKER</span></CardTitle>
            <CardDescription className="text-center">First Mini Bus tracker in Montalban Rizal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-6 flex justify-center">
              <Button onClick={async()=>{
                try {
                  const response = await signIn('google')
                  console.log(response)
                } catch (error) {
                  console.log(error)
                }
              }}>Continue with Google</Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/"><Button variant="outline"><ChevronLeft /> Home</Button></Link>
            <Link href="/auth/login/operator"><Button variant="outline">Signin as Operator</Button></Link>
          </CardFooter>
        </Card>
      </div>
    </div>
    </>
  );
}
