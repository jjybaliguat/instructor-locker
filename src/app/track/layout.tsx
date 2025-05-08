import { AppSidebar } from '@/components/app-sidebar'
import MyBreadCrumb from '@/components/MyBreadCrumb'
import MyProviders from '@/components/MyProviders'
import PushNotificationInit from '@/components/PushNotificationProvider'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import NextTopLoader from 'nextjs-toploader'
import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'

const TrackLayout = ({children}:{children: ReactNode}) => {
  return (
    <>
    <MyProviders>
      <NextTopLoader showSpinner={false} />
      <SidebarProvider>
        <Toaster position="top-center" />
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <MyBreadCrumb />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-2 md:p-4 pt-0 pb-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </MyProviders>
    </>
  )
}

export default TrackLayout