import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// export async function GET(){
//     try {
//         const response = await prisma.locationLogs.findMany({});
//         return NextResponse.json(response, {status: 200})
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({message: "Internal Server Error: " + error});
//     }
// }

export async function POST(req: NextRequest){
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.search)
    const deviceId = searchParams.get("deviceId") as string;
    const lat = searchParams.get("lat") as string;
    const lng = searchParams.get("lng") as string;

    try {
        const response = await prisma.locationLogs.create({
            data: {
                deviceId: deviceId,
                lat: lat,
                lng: lng,
            }
        })
        console.log(response);
        return NextResponse.json(response, {status: 201})
    } catch (error) {
        console.log(error)
        throw new Error("Internal Server Error");
    }
}
