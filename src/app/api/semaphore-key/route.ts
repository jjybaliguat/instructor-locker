import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
    const { key } = await req.json()
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    const id = params.get('id') as string

    if(!key){
        return NextResponse.json({message: "Missing Required Fileds"}, {status: 400})
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                semaphoreKey: true
            }
        })
        if(!user?.semaphoreKey){
            const apiKey = await prisma.semaphoreKey.create({
                data: {
                    userId: id,
                    key
                }
            })
            return NextResponse.json(apiKey, {status: 201})
        }else{
            const apiKey = await prisma.semaphoreKey.update({
                where: {
                    id: user.semaphoreKey.id
                },
                data: {
                    key
                }
            })
            return NextResponse.json(apiKey, {status: 201})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}