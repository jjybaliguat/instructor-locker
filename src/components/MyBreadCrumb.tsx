"use client"

import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

const MyBreadCrumb = () => {
    const pathname = usePathname()
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname.split("/").slice(1).map((item)=>(
            <div key={item} className='flex items-center gap-2'>
                <BreadcrumbItem>
                    <BreadcrumbPage className='capitalize'>{item}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="" />
            </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default MyBreadCrumb