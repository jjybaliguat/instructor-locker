"use client"

import React from 'react'
import { getAuth } from 'firebase/auth'
import { app } from '@/utils/firebase'

function SignInWithGoogle() {

    const auth = getAuth(app)

  async function handleSignIn(){
    try {
        
    } catch (error) {
        
    }
  }

  return (
    <div>SignInWithGoogle</div>
  )
}

export default SignInWithGoogle