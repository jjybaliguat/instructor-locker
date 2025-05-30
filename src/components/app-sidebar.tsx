"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Bus,
  ChartLine,
  CircleAlert,
  Command,
  Computer,
  FileLock2,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  MessageSquareMore,
  PieChart,
  PlusIcon,
  QrCode,
  Settings2,
  SquareTerminal,
  TriangleAlert,
  User,
  UserIcon,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { MySidebarHeader } from "./MySidebarHeader"

// This is sample data.
const navData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Intructors",
      url: "/dashboard/instructors",
      icon: Users,
    },
    {
      title: "Lockers",
      url: "/dashboard/lockers",
      icon: FileLock2
    }
  ],
  userNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      // isActive: true
    },
    // {
    //   title: "My QR Code",
    //   url: "/dashboard/qr",
    //   icon: QrCode,
    //   // isActive: true
    // },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
      // isActive: true
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data} = useSession()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <MySidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        {data && data?.user.role === "ADMIN" ? <NavMain items={navData.navMain} /> : data?.user.role === "INSTRUCTOR" ?<NavMain items={navData.userNav} /> : null}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
