import { decrypt } from "@/utils/secure-key";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const {devId, message} = await req.json()

    if(!devId || !message){
        return NextResponse.json({message: "Missing required fields."}, {status: 400})
    }
    try {
        const device = await prisma.device.findUnique({
            where: {
                deviceId: devId
            },
            include: {
                user: {
                    include: {
                        semaphoreKey: true
                    }
                }
            }
        })
        
        if(!device?.user?.semaphoreKey?.key){
            return NextResponse.json({message: "SMS integration not enabled."}, {status: 400})
        }
        const params = {
            apikey: decrypt(device.user.semaphoreKey.key),
            message: message,
            number: device.user.number || '',
            sendername: "CAM2NET"
        }
        const queryString = new URLSearchParams(params).toString();
        const sms = await fetch(`https://api.semaphore.co/api/v4/messages?${queryString}`, {
            method: "POST"
        })
        const data = await sms.json()
        console.log(data)
        return NextResponse.json({message: "Sms Alert sent successfully"}, {status: 200})
    } catch (error) {
        console.log(error)
    }
}