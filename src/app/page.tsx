"use client"
import LogoutBtn from '@/components/btn/LogoutBtn'
import dynamic from 'next/dynamic';

// Dynamically import the map component
const MyMap = dynamic(() => import('@/components/MyMap'), {
  ssr: false, // Disable server-side rendering
});
import React from 'react'

function Home() {
  return (
    <div>
      <MyMap />
      <h1>Home Page</h1>
      <LogoutBtn />
    </div>
  )
}

export default Home