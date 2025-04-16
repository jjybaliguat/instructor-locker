"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useSWR from "swr"
import { useSession } from "next-auth/react"

export function SemaphoreAccountCard() {
  const {data: session} = useSession()
  const userId = session?.user.id
  const {data: semaphoreAccount, isLoading} = useSWR(userId? "getSemaphoreAccount" : null, GetSemaphoreAccount)

  async function GetSemaphoreAccount() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semaphore?key=${session?.user.semaphoreKey?.key}`)
      const data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card className="w-[350px] h-full">
      <CardHeader>
        <CardTitle>Semaphore Account</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Account Name</Label>
              <Input value="" readOnly />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Status</Label>
              <Input value="" readOnly />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Credit Balance</Label>
              <Input value="" readOnly />
            </div>
          </div>
      </CardContent>
    </Card>
  )
}
