"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

function Home() {
  return (
    <div>Home Page

    <button onClick={()=>signOut()}>Sign Out</button>
    </div>
  )
}

export default Home