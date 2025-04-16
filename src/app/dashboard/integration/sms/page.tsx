import { SemaphoreAccountCard } from '@/components/cards/SemaphoreAccountCard'
import { SmsIntegrationForm } from '@/components/cards/SmsIntegrationForm'
import React from 'react'

const SmsIntegration = () => {
  return (
    <div className="flex flex-1 flex-col gap-2 p-4 pt-6">
          <h1 className='text-xl'>SMS Integration</h1>
          <div className='flex items-center gap-4 flex-col md:flex-row'>
            <SmsIntegrationForm />
            <SemaphoreAccountCard />
          </div>
        </div>
  )
}

export default SmsIntegration