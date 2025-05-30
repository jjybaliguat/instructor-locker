import React from 'react'
import { InstructorTable } from '@/components/tables/instructors-table'

const InstructorPage = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-foreground">Instructors</h2>
        <InstructorTable />
    </>
  )
}

export default InstructorPage