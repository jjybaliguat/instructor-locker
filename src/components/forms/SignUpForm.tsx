'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, TriangleAlert } from "lucide-react"

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email({
    message: "Invalid Email Address"
  }),
  name: z.string().min(3, "Atleast 2 characters"),
  // companyName: z.string().min(1, "Company Name is required"),
  // address: z.string().min(1, "Address is required"),
  // contact: z.string().min(1, "Contact is required"),
  password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"], // Path of the error
  message: "Passwords must match",
});

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">){
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter()
  const [successMessage, setSuccessMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
  setPending(true)
  setSuccessMessage("")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "POST",
        body: JSON.stringify(values)
      })

      const data = await response.json()
      if(!data.error){
        setError("")
        setPending(false)
        setSuccessMessage("Account Created!")
        form.reset()
        // console.log(data)
      }else{
        setSuccessMessage("")
        setError(data.error)
        setPending(false)
      }
    } catch (error: any) {
      setSuccessMessage("")
      setError(error.error)
      console.log(error)
      setPending(false)
    }
  } 
  return (
    <>
    <div className="w-full max-w-sm mx-auto">
      <Link href="/"><Button variant="outline"><ChevronLeft /> Home</Button></Link>
      <Card className="w-full mt-2">
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-balance text-muted-foreground">
                Create an BusTrack Account
            </p>
            </div>
            {successMessage !== "" && <div className="flex flex-col items-center gap-2">
              <h3 className="text-green-500 text-center font-bold">{successMessage}</h3>
              <Button type="button" onClick={()=>router.push("/auth/sign-in")}>Back to login</Button>
          </div>}
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 dark:bg-destructive/30 p-3 flex items-center gap-x-2 text-sm text-destructive dark:text-red-500 mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent>
          <Form {...form}>
            <form className="p-1 md:p-2" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="your name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Create a strong password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button disabled={pending} type="submit" className="mt-4 w-full">
                  {pending ? "Creating..." : "Create"}
                </Button>
                <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/sign-in" className="underline underline-offset-4">
                    Sign in
                </Link>
                </div>
            </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </>
  )
}
