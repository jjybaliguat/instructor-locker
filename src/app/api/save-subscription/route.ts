import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
    const { endpoint, keys } = await req.json();

    try {
      await prisma.pushSubscription.upsert({
        where: { endpoint },
        update: { keys },
        create: {
          endpoint,
          keys,
        },
      });
      return NextResponse.json({message: "Subscription Saved"}, {status: 201})
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }

}