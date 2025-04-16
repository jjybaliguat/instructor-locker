import { hashPassword } from "@/utils/hashPassword";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
    const {name, email, password} = await req.json()

    if(!name || !email || !password){
        return NextResponse.json({error: "Missing required fields"}, {status: 400})
    }
    try {
        const isEmailExist = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(isEmailExist){
            return NextResponse.json({error: "Email already registered."}, {status: 400})
        }
        const hashedPass = await hashPassword(password) as string
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPass,
            }
        })

        return NextResponse.json(user, {status: 201})
    } catch (error) {
        console.log(error)
        NextResponse.json({error: "Internal Server Error."}, {status: 500})
    }
}

export async function PATCH(req: Request){
    const body = await req.json()
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    const id = params.get('id')
    const {name, email, semaphoreKey} = body

    if(!id){
        return NextResponse.json({message: "Missing id field"}, {status: 400})
    }
    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name,
                email
            }
        })
            
        return NextResponse.json(user, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
    } 
}