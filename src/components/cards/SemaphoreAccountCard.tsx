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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SemaphoreAccountCard() {
  return (
    <Card className="w-[350px]">
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
