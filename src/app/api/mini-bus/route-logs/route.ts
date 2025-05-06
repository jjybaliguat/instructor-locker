import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const devId = params.get("devId") as string;

  if (!devId) {
    return NextResponse.json({message: "Missing Required field"}, {status: 400})
  }

  try {
    const now = new Date();

    // Get yesterday's date
    const startOfYesterday = new Date(now);
    startOfYesterday.setDate(now.getDate() - 3);
    startOfYesterday.setHours(0, 0, 0, 0); // 12:00 AM yesterday

    const endOfYesterday = new Date(now);
    endOfYesterday.setDate(now.getDate() - 3);
    endOfYesterday.setHours(23, 59, 59, 999); // 11:59:59 PM yesterday

    const routelogs = await prisma.gPSData.findMany({
      where: {
        device: {
            id: devId
        },
        timestamp: {
          gte: startOfYesterday,
          lte: endOfYesterday,
        },
      },
      orderBy: {
        timestamp: "asc", // optional: to show logs in chronological order
      },
    });

    return NextResponse.json(routelogs, {status: 200})
  } catch (error) {
    console.error("Error fetching GPS logs:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
}
