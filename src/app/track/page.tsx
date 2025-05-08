import NearbyBuses from '@/components/NearbyBuses'
import dynamic from 'next/dynamic'
import React from 'react'


const CommutersMap = dynamic(() => import('@/components/CommutersMap'), {
  ssr: false, // disable server-side rendering
  loading: () => <p>Loading map...</p>, // optional: loading fallback
})

const CommuterDashboard = () => {
  
  return (
    <>
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div className='col-span-1 h-full w-full rounded-xl bg-muted/50 z-40 p-6'>
        <NearbyBuses />
      </div>
      <div className="col-span-2 h-[55vh] md:h-[85vh] w-full rounded-xl bg-muted/50 z-40">
        <CommutersMap />
      </div>
    </div>
    </>
  )
}

export default CommuterDashboard