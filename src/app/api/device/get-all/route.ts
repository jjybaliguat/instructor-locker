import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request){
    try {
        const devices = await prisma.device.findMany({
            include: {
                assignedBus: true
            }
        })

        return NextResponse.json(devices, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}