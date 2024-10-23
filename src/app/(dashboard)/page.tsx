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
<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { BusIcon } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { getTotalDevice } from '../actions';
import { database, onValue, ref } from '@/utils/firebase';

function Home() {
  const {data: totalDevice, isLoading} = useSWR("getTotalDevice", getTotalDevice)

=======
import React from 'react'
import { BusIcon } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { getTotalDevice } from '../actions';

function Home() {
  const {data: totalDevice, isLoading} = useSWR("getTotalDevice", getTotalDevice)
>>>>>>> 5b068729854c6c02fd4c6f2097e4754624e92996
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
          <div className="text-2xl font-bold">{totalDevice}</div>
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