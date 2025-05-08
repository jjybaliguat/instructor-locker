import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request){
    try {
        const buses = await prisma.miniBus.findMany({
            include: {
                device: {
                    include: {
                        gpsData: true
                    }
                }
            }
        })

        return NextResponse.json(buses, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}