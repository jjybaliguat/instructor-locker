"use client"

import React from 'react'
import OverviewCard from '@/components/cards/OverviewCard'
import { useSession } from 'next-auth/react'
import LockerCard from '@/components/cards/LockerCard'

const Dashboard = () => {
  const {data} = useSession()
  const user = data?.user
  return (
    user &&
    <>
      {user?.role === "ADMIN" &&
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <>
          <OverviewCard title='Total Instructors' image='/people-icon.png' total={15} />
          <OverviewCard title='Total Lockers' image='/locker-pic.png' total={15} />
          </>
      </div>
      }
      {user.role === "INSTRUCTOR" &&
        <LockerCard title='My Locker' image='/locker-pic.png' />
      }
    </>
  )
}

export default Dashboard