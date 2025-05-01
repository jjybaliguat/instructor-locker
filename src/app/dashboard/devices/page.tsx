"use client"

import DeviceCard from '@/components/cards/DeviceCard'
import { MydevicesTable } from '@/components/tables/DevicesTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Device } from '@/types/Device'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'

const DevicesPage = () => {
  const session = useSession()
  const userId = session.data?.user.id
  const {data, isLoading} = useSWR(userId? "get-devices" :  null, GetDevices)

  async function GetDevices(){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/device?userId=${userId}`)

      const data = await response.json()
      console.log(data)

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-2 p-4 pt-6">
      <h1 className="text-2xl font-bold">Devices</h1>
      {/* <MydevicesTable /> */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-cols-1">
      {data?.map((dev: Device) => (
        <DeviceCard
          key={dev.id}
          device={dev}
        />
      ))}
    </div>
    </div>
  )
}

export default DevicesPage