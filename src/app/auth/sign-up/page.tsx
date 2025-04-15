import { SignUpForm } from '@/components/forms/SignUpForm'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <SignUpForm />
    </div>
  )
}

export default SignUpPage