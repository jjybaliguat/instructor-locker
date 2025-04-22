"use client"
import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { SessionProvider } from 'next-auth/react'

function MyProviders({children}: {children: ReactNode}) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
          {children}
      </SessionProvider>
    </ThemeProvider>
  )
}

export default MyProviders