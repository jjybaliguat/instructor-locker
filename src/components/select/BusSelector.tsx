'use client';

import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import BusOrientation from '../3d/BusOrientation';

export default function BusSelector() {
  const router = useRouter();
  const session = useSession()
  const user = session.data?.user
  const {data: buses, isLoading} = useSWR(user? 'getMiniBuses' : null, GetMiniBuses)
  const [selectedBus, setSelectedBus] = useState<any | null>(null)
  // const [buses, setBuses] = useState<any | null>(null)

  async function GetMiniBuses(){
    try {
        const response = await fetch(`/api/mini-bus?userId=${user?.id}`)
        const data = await response.json()
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
  }

  // useEffect(()=> {
  //   user && GetMiniBuses()
  // }, [router, user])

  return (
    <>
    <div className="p-4 w-full max-w-sm">
      <label className="block mb-2 text-lg font-medium">Select a Bus</label>
      <Select onValueChange={(value) => setSelectedBus(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a bus" />
        </SelectTrigger>
        <SelectContent>
          {buses && buses?.map((bus: any) => (
            <SelectItem key={bus.id} value={bus}>
              PlateNo: {bus.plateNumber} - <span>Driver: {bus.driver}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    {selectedBus? (
        <BusOrientation 
        busString={`PlateNo.: ${selectedBus.plateNumber}, Driver: ${selectedBus.driver}`} 
        topic={selectedBus?.device?.accelTopic? selectedBus?.device?.accelTopic : ""} 
        />
    ) : <div className='p-4'>
            <h1 className='text-md'>No Bus Selected</h1>
        </div>}
    </>
  );
}
