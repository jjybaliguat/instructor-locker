"use client"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { ArrowLeft, ChevronLeft, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email({
    message: "Invalid Email Address"
  }),
  password: z.string().min(1, "Password is required"),
})

export default function LoginPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values)
      setPending(true)
      const response: any = await signIn('credentials', {
        ...values,
        redirect: false 
      });
      if (response?.ok) {
        router.push("/dashboard");
        // toast.success("login successful");
      } else if (response?.status === 401) {
        setError("Invalid Credentials");
        setPending(false);
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      setPending(false)
    }
  } 

  return (
    <>
    <div className="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm mx-auto">
        <Link href="/"><Button variant="outline"><ChevronLeft /> Home</Button></Link>
        <Card className="w-full mt-2">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center flex-col md:flex-row">
              <div className="p-1 bg-slate-100 rounded-[15px]">
                <Image
                  src="/logo.png"
                  alt=""
                  height={80}
                  width={80}
                />
              </div>
              <span className="text-2xl font-bold text-center">Welcome to Mini-Bus TRACKER</span></CardTitle>
            <CardDescription className="text-center">First Mini Bus tracker in Montalban Rizal</CardDescription>
          </CardHeader>
          {!!error && (
            <div className="bg-destructive/15 dark:bg-destructive/30 p-3 flex items-center gap-x-2 text-sm text-destructive dark:text-red-500 mb-6">
              <TriangleAlert />
              <p>{error}</p>
            </div>
          )}
          <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
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
                          <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <a
                              href="#"
                              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                              Forgot your password?
                            </a>
                          </div>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                <Button disabled={pending} type="submit" className="w-full">
                  {pending? "Logging in..." : "Login"}
                </Button>
                <Button type="button" variant="outline" className="w-full"
                  onClick={async()=>{
                    try {
                      const response = await signIn('google')
                      console.log(response)
                    } catch (error) {
                      console.log(error)
                    }
                  }}
                >
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
