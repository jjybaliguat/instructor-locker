import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request){
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    if (!code) {
        return NextResponse.json(
          { error: 'Missing code parameter' },
          { status: 400 }
        )
      }

    try {
        const instructor = await prisma.instructorProfile.findUnique({
            where: { qrCode: code },
            include: { locker: true }, // Include related locker
          })

          // console.log(instructor)
        
          if (!instructor || !instructor.locker?.lockerNumber) {
            return NextResponse.json(
              { authenticationStatus: false },
              { status: 400 }
            )
          }
          
          await prisma.locker.update({
            where: {
              lockerNumber: instructor.locker?.lockerNumber
            },
            data: {
              status: "OPEN"
            }
          })
          console.log({
            authenticationStatus: true,
            assignedLocker: instructor?.locker?.lockerNumber,
          })
          return NextResponse.json({
            authenticationStatus: true,
            assignedLocker: instructor?.locker?.lockerNumber,
          }, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}