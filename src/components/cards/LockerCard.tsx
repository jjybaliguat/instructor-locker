"use client"

import { GetInstructorAssignedLocker } from '@/app/actions'
import { StringOrTemplateHeader } from '@tanstack/react-table'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import useSWR from 'swr'
import QRCodeRenderer from '../QrCodeRenderer'

const LockerCard = ({
    title,
    image
} : {
    title: string,
    image: string
}) => {
    const session = useSession()
    const user = session?.data?.user
    console.log(user)
    const {data, isLoading} = useSWR(user? "getInstructorLocker" : null, GetInstructorLocker)
    console.log(data)

    async function GetInstructorLocker() {
        try {
            const locker = await GetInstructorAssignedLocker(user?.instructor?.id)
            return locker
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
  return (
    <div className='flex flex-col gap-4'>
        <div className="aspect-auto rounded-xl bg-muted/50 p-4">
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-4'>
            <h1>{title}</h1>
            <p>Status: {data?.status}</p>
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
        <div className='flex flex-col gap-4 aspect-auto rounded-xl bg-muted/50 p-4'>
            <h1>My QR</h1>
            <QRCodeRenderer text={user?.instructor?.qrCode} size={256} />
        </div>
    </div>
  )
}

export default LockerCard