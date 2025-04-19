'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { AlertTriangle, MapPin, GaugeCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const alerts = [
  {
    id: "E1",
    busId: "60d21b4667d0d8992e610c85", // Example busId
    type: "EMERGENCY",
    lat: "14.676",
    long: "121.0886",
    message: "Bus in distress near Litex",
    timestamp: "2025-04-19T08:00:00Z",
  },
  {
    id: "G1",
    busId: "60d21b4667d0d8992e610c86", // Example busId
    type: "GEOFENCE_BREACH",
    message: "Bus crossed the geofence boundary at San Isidro",
    timestamp: "2025-04-19T09:30:00Z",
  },
  {
    id: "O1",
    busId: "60d21b4667d0d8992e610c87", // Example busId
    type: "OVERSPEEDING",
    message: "Bus exceeded speed limit near Litex",
    timestamp: "2025-04-19T10:00:00Z",
  },
  // More alerts...
]

export default function AlertsPage() {

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mini-Bus Alerts</h1>

      <Tabs defaultValue="emergency" className="w-full">
        <TabsList className="bg-muted rounded-lg">
          <TabsTrigger value="emergency">
            <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />
            Emergency
          </TabsTrigger>
          <TabsTrigger value="geofencing">
            <MapPin className="w-4 h-4 mr-1 text-green-500" />
            Geofencing
          </TabsTrigger>
          <TabsTrigger value="overspeeding">
            <GaugeCircle className="w-4 h-4 mr-1 text-yellow-500" />
            Overspeeding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="emergency" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {alerts
            .filter((alert) => alert.type === "EMERGENCY")
            .map((alert) => (
              <Card key={alert.id}>
                <CardHeader>
                  <CardTitle>Mini Bus 1</CardTitle>
                  <CardDescription>{alert.message}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleTimeString()}</p>
                  <Link href={`https://www.google.com/maps?q=${alert?.lat},${alert?.long}`} target="_blank" rel="noopener noreferrer">
                    <Button className="text-white">View Bus in Google Maps</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="geofencing" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts
            .filter((alert) => alert.type === "GEOFENCE_BREACH")
            .map((alert) => (
              <Card key={alert.id}>
                <CardHeader>
                  <CardTitle>Mini Bus 1</CardTitle>
                  <CardDescription>{alert.message}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="text-white">View Bus Realtime Location</Button>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="overspeeding" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts
            .filter((alert) => alert.type === "OVERSPEEDING")
            .map((alert) => (
              <Card key={alert.id}>
                <CardHeader>
                  <CardTitle>Mini Bus 1</CardTitle>
                  <CardDescription>{alert.message}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="text-white">View Bus Realtime Location</Button>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
