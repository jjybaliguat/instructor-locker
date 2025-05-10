import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function PATCH(req: Request){
    const {userId, code} = await req.json()
    try {
        const newQr = await prisma.instructorProfile.update({
            where: {
                userId
            },
            data: {
                qrCode: code
            }
        })

        return NextResponse.json(newQr, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}