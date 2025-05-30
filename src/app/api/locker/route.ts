import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request) {

    try {
        const lockers = await prisma.locker.findMany({
            include: {
                assignedTo: true
            }
        })

        return NextResponse.json(lockers, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}