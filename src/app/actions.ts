"use server"

import { decrypt } from "@/utils/secure-key"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GetInstructorAssignedLocker(instructorId: string | undefined) {

    if(!instructorId){
        return null
    }
    
    try {
        const locker = await prisma.locker.findUnique({
            where: {
                instructorId
            }
        })
        return locker
    } catch (error) {
        console.log(error)
        return null
    }
}