import { LockersTable } from '@/components/tables/LockersTable'
import React from 'react'

const Lockers = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-foreground">Lockers</h2>
      <LockersTable />
    </>
  )
}

export default Lockers