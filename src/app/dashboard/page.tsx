import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import OverviewCard from '@/components/cards/OverviewCard'

const Map = dynamic(() => import('@/components/MyMap'), {
  ssr: false, // disable server-side rendering
  loading: () => <p>Loading map...</p>, // optional: loading fallback
})

const Dashboard = () => {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <OverviewCard title='Total Buses' image='/bus2.png' total={2} />
        <OverviewCard title='Total Devices' image='/gps-device.png' total={2} />
        <OverviewCard title='Total Employees' image='/employees.png' total={2} />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min z-40">
        <Map />
      </div>
    </>
  )
}

export default Dashboard