import { SmsTable } from '@/components/tables/SmsTable'
import React from 'react'

const SmsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-2 p-4 pt-6">
      <h1 className='text-xl'>SMS</h1>
      <SmsTable />
    </div>
  )
}

export default SmsPage