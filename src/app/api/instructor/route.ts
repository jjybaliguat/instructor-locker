import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.search) 
    const id = searchParams.get('id') as string
    
    try {
        const instructors = await prisma.instructorProfile.findMany({
            where: {
                adminId: id
            },
            include: {
                user: true,
                locker: true
            }
        })

        return NextResponse.json(instructors, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}