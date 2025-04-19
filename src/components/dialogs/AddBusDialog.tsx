"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { mutate } from "swr"

const formSchema = z.object({
  plateNumber: z.string().min(1),
  model: z.string().optional(),
  driver: z.string().optional(),
  conductor: z.string().optional(),
  capacity: z.coerce.number().min(1),
})

export function AddBusDialog() {

    const buttonRef = useRef<HTMLButtonElement>(null)
    const {data} = useSession()
    const userId = data?.user.id
    const [isSubmitting, setIsSubmitting] = useState(false)
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plateNumber: "",
      model: "",
      driver: "",
      conductor: "",
      capacity: 0
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mini-bus?userId=${userId}`, {
        method: "POST",
        body: JSON.stringify(values)
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("Mini-bus added successfully!")
        setIsSubmitting(false)
        form.reset()
        buttonRef.current?.click()
        mutate("get-minibuses")
        // Optional: redirect or reset form here
      } else {
        toast.error(data.message || "Failed to add mini-bus.")
        console.error("Server error:", data)
        setIsSubmitting(false)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.error("Network error:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white">Add Bus</Button>
      </DialogTrigger>
      <DialogClose ref={buttonRef} asChild>
          <Button type="button" variant="secondary" className='hidden'>
          Close
          </Button>
      </DialogClose>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add New Bus</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="space-y-2">
                  <FormField
                  control={form.control}
                  name="plateNumber"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Plate Number <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                          <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                          
                      </FormDescription>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Model (optional)</FormLabel>
                      <FormControl>
                          <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                          
                      </FormDescription>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="driver"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Assigned Driver (optional)</FormLabel>
                      <FormControl>
                          <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                          
                      </FormDescription>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="conductor"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Assigned Conductor (optional)</FormLabel>
                      <FormControl>
                          <Input type="text" placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                          
                      </FormDescription>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Capacity <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                          <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                          
                      </FormDescription>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button disabled={isSubmitting} type="submit">{isSubmitting ? "Creating..." : "Submit"}</Button>
                </div>
            </form>
            </Form>
    </DialogContent>
    </Dialog>
  )
}
