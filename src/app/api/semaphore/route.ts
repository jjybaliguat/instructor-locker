import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function GET(req: Request){
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    const key = params.get('key') as string
    try {
        const account = await fetch(`https://api.semaphore.co/api/v4/account?apikey=${key}`)
        
        console.log(account)
        return NextResponse.json(account, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}