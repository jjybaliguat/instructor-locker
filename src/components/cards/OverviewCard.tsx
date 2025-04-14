import { StringOrTemplateHeader } from '@tanstack/react-table'
import Image from 'next/image'
import React from 'react'

const OverviewCard = ({
    title,
    image,
    total
} : {
    title: string,
    image: string,
    total: number
}) => {
  return (
    <div className="aspect-auto rounded-xl bg-muted/50 p-4">
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-4'>
          <h1>{title}</h1>
          <h1 className='text-3xl font-medium'>{total}</h1>
        </div>
        <div className='relative h-[80px] w-[80px]'>
          <Image
            src={image}
            alt="image"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center"
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default OverviewCard