"use client"
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import { MenuIcon } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useSession } from "next-auth/react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Avatar, AvatarImage } from "../ui/avatar";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/custom-drawer";
import { Button } from "../ui/button";
  

const navlinks = [
    {
        name: "Home",
        path: "/admission",
        children: <div className="w-[500px] h-[600px] bg-white">
            <h1>Hello</h1>
        </div>
    },
    {
        name: "About",
        path: "/about",
        children: <div className="w-[500px] h-[600px] bg-white">
            <h1>Hi</h1>
        </div>
    },
    // {
    //     name: "Faq's",
    //     path: "/faqs"
    // },
]

export function NavBar({ className, initial, before, after }: { className: string; initial: {}; before: {}; after: {} }){

    const router = useRouter()
    const pathname = usePathname()
    const {data: session} = useSession()

    return(
        <Nav className={className} initial={initial} before={before} after={after} >
            <div className="flex items-center gap-24">
                <Link className="flex justify-center items-center gap-2" href="/">
                    <div className="relative h-[50px] w-[50px] rounded-full">
                        <Image src="/favicon.png" fill alt="logo" style={{
                            objectFit: "cover",
                            objectPosition: "center"
                        }} 
                        className="w-full h-full rounded-full"
                        />
                    </div>
                    <h3 className='text-3xl text-white font-semibold font-mono'>MiniBus</h3>
                </Link>
                <div className="hidden md:flex gap-4 items-center rounded-full border border-white/50 bg-black/20">
                <NavLink href="/">Home</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Link href="/auth/sign-in"><Button>Sign In</Button></Link>
                    <Avatar className="text-black">
                        <AvatarImage src={session?.user?.image as string} alt="userimg" />
                        {/* <AvatarFallback>{session?.user?.email?.split("")[0]}</AvatarFallback> */}
                    </Avatar>
                </div>
                <div className="md:hidden flex items-center justify-center">
                <Drawer direction="right">
                    <DrawerTrigger asChild>
                        <Button size="icon" variant="ghost" className="group p-1 cursor-pointer">
                            <MenuIcon className="h-8 w-8 text-white group-hover:text-black" />
                            <span className="sr-only">Nav Menu</span>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerClose>
                            <div className="bg-white rounded-t-[10px]">
                                <div onClick={()=>router.push("/")}
                                    className="p-4 flex items-center gap-4"
                                    >
                                        <div className="relative h-[50px] w-[50px]">
                                            <Image
                                                src="/logo.png"
                                                alt="cdm logo"
                                                fill
                                                style={{
                                                objectFit: "cover",
                                                objectPosition: "center"
                                                }}
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <h1 className="text-xl text-black font-semibold">MiniBus Tracker</h1>
                                </div>
                            </div>
                        </DrawerClose>
                        <div className="w-full h-[1px] bg-muted" />
                        <div className="w-full h-full bg-white flex items-start flex-col gap-4 py-12 px-8">
                            {navlinks.map((item)=>(
                                <DrawerClose key={item.name} className="w-full">
                                    <div 
                                    onClick={()=>router.push(item.path)}
                                    className="flex justify-between items-center w-full">
                                        <h1 
                                            className="text-xl text-black hover:text-primary p-2"
                                        // className={cn({
                                        //     "text-xl text-primary-foreground p-2": true,
                                        //     "border-r-2 border-r-primary-foreground": pathname == item.path
                                        // })}
                                        >{item.name}
                                        </h1>
                                        <div className={cn({
                                            "h-2 w-2 bg-primary-foreground rounded-full": pathname == item.path
                                        })} />
                                    </div>
                                </DrawerClose>
                            ))}
                        </div>
                    </DrawerContent>
                </Drawer>
              </div>
            </div>
    </Nav>
    )
}

export function Nav({ children, className, initial, before, after }: { children: React.ReactNode; className: string; initial: {}; before: {}; after: {}  }) {
    const [showNavbar, setShowNavbar] = useState(false);


    const handleScroll = (e : WheelEvent) => {
        if (e.deltaY > 0) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
      };
    
      useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => {
          window.removeEventListener('wheel', handleScroll);
        };
      }, []);

    return (
            <motion.div
                initial={initial}
                animate={showNavbar ? before : after}
                transition={{ duration: 0.5, ease: 'easeOut' }}

                className={className}
            >
                {children}
            </motion.div>
            )
}


export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return (
        <Link {...props} className={cn("h-10 inline-flex items-center px-4 rounded-full bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50", 
            pathname === props.href && "text-primary-foreground"
        )} />
    )
}