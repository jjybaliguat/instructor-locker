import { decrypt } from "@/utils/secure-key";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()


let lastFetch = 0
let cache: any = null

export async function GET(req: Request){
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    const key = params.get('key') as string

    const now = Date.now()
    const cooldown = 60 * 1000 // 1 minute

    if (now - lastFetch < cooldown && cache) {
        return NextResponse.json(cache, {status: 200})
      }

    try {
        const decryptedKey = decrypt(key)
        const response = await fetch(`https://api.semaphore.co/api/v4/account?apikey=${decryptedKey}`)
        
        const account = await response.json()

        lastFetch = now
        cache = account
        
        return NextResponse.json(account, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}