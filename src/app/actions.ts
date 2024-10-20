"use server"

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function getTotalDevice(){
    try {
        const count = await prisma.device.count({
            where: {
                parentIdentifier: "maes-device"
            }
        })
        return count
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getLatestDevicesCoord(){
    try {
        const response = await prisma.device.findMany({
            where: {
                parentIdentifier: 'maes-device',
            },
            include: {
                locationLogs: true,
            }
        })
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}