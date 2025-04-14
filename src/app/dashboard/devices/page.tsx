import { MydevicesTable } from '@/components/tables/DevicesTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const DevicesPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-2 p-4 pt-6">
      <h1>Devices</h1>
      <MydevicesTable />
    </div>
  )
}

export default DevicesPage