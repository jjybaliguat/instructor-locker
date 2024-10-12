"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

function LogoutBtn() {
  return (
    <button onClick={()=>signOut()}>Sign Out</button>
  )
}

export default LogoutBtn