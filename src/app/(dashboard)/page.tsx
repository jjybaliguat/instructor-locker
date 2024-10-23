"use client"
import PageContainer from '@/components/layout/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import dynamic from 'next/dynamic';
import useSWR from "swr"

// Dynamically import the map component
const MyMap = dynamic(() => import('@/components/MyMap'), {
  ssr: false, // Disable server-side rendering
});
import React, { useEffect, useState } from 'react'
import { BusIcon } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { getTotalDevice } from '../actions';
import { database, onValue, ref } from '@/utils/firebase';

function Home() {
  // const {data: totalDevice, isLoading} = useSWR("getTotalDevice", getTotalDevice)

//   const [gpsData, setGpsData] = useState({
//     latitude: 0,
//     longitude: 0
//   })

// //   console.log(gpsData)

//     useEffect(()=>{
//       const latRef = ref(database, 'gpsData');
//       onValue(latRef, (snapshot: { val: () => any; }) => {
//         const data = snapshot.val();
//         console.log(data)
//         setGpsData(data)
//       });
//     }, [])

  return (
    <PageContainer>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">
            Total Buses
          </CardTitle>
          <BusIcon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1</div>
        </CardContent>
      </Card>  
    </div>
      <div className='mt-12 flex flex-col gap-2'>
        <Heading title='Your Mini Buses Live Location' description=''/>
        <MyMap />
      </div>
    </PageContainer>
  )
}

export default Home