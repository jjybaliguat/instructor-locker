"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { toast } from 'sonner'
import { useRouter } from "next/navigation"
import { useSemaphoreAccountStore } from "@/lib/store/semaphore"

export function SmsIntegrationForm() {
  const [pending, setPending] = React.useState(false)
  const {data: session, update} = useSession()
  const [apiKey, setApiKey] = React.useState(session?.user?.semaphoreKey?.key)
  const [isReadOnly, setIsReadonly] = React.useState(false)
  const [emptyApiKey, setEmptyApiKey] = React.useState(true)
  const { setAccount } = useSemaphoreAccountStore()
  const router = useRouter()

  React.useEffect(()=>{
    setApiKey(session?.user.semaphoreKey?.key)
    setIsReadonly(Boolean(session?.user?.semaphoreKey?.key ?? ""))
    setEmptyApiKey(!Boolean(session?.user?.semaphoreKey?.key ?? ""))
  }, [session])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semaphore-key?id=${session?.user?.id}`, {
        method: "POST",
        body: JSON.stringify({key: apiKey})
      })
      const data = await response.json()
      update({
        user: {
          ...session?.user,
          semaphoreKey: data
        }
      })
      setPending(false)
      const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semaphore?key=${data?.key}`)
      const account = await res.json()
      if(!res.ok){
        toast.error(account.message, {
          duration: 3000
        })
      }else{
        if(!account.account_name){
          setAccount({
            key: "",
            account_name: "",
            status: "",
            credit_balance: 0
          })
          toast.error(account.apikey[0], {
            duration: 3000
          })
        }else{
          setAccount({
            key: data.key,
            ...account
          })
          toast.success("SMS ApiKey Updated", {
            duration: 3000
          })
        }
      }
    } catch (error) {
      console.log(error)
      setPending(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>SMS Integration</CardTitle>
        <CardDescription>Connect your sms gateway to enable sms notification alerts.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Semaphore Api Key</Label>
              <Input id="name" placeholder="enter api key"
              value={apiKey}
              type={isReadOnly ? "password" : "text"}
              onChange={(e)=>setApiKey(e.target.value)}
              required
              readOnly={isReadOnly}
              autoComplete="new-password"
              autoCorrect="off"
              spellCheck={false}
              />
            </div>
          </div>
          <div className="flex justify-end mt-5">
            {!isReadOnly && 
              <div className="flex items-center gap-2">
              {!emptyApiKey && <Button type="button" variant="outline"
              onClick={()=>{setIsReadonly(true); setApiKey(session?.user.semaphoreKey?.key)}}
              >Cancel</Button>}
              <Button type="submit" disabled={pending}>{pending? "Saving..." : "Save"}</Button>
            </div>
            }
            {isReadOnly && 
                <Button type="button"
                onClick={()=>{setIsReadonly(false); setApiKey("")}}
                >Change</Button>
            }
          </div>
        </form>
        <CardFooter className="mt-4">
          {/* <div>
            <Button type="button" variant="outline">Test Connection</Button>
          </div> */}
        </CardFooter>
      </CardContent>
    </Card>
  )
}
