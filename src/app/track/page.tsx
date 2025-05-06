import dynamic from 'next/dynamic'
import React from 'react'


const Map = dynamic(() => import('@/components/MyMap'), {
  ssr: false, // disable server-side rendering
  loading: () => <p>Loading map...</p>, // optional: loading fallback
})

const CommuterDashboard = () => {
  
  return (
    <>
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div className="col-span-2 h-[55vh] md:h-[85vh] w-full rounded-xl bg-muted/50 z-40">
        <Map />
      </div>
      <div className='h-full w-full rounded-xl bg-muted/50 z-40 p-6'>
        <h1 className='text-xl font-medium'>Nearby Mini-Buses</h1>
      </div>
    </div>
    </>
  )
}

export default CommuterDashboard