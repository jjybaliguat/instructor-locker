import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET() {
  const now = new Date();

  // Start of the week: Sunday
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  console.log(startOfWeek)

  // End of the week: Saturday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const result = await prisma.$runCommandRaw({
    aggregate: 'GPSData',
    pipeline: [
      {
        $match: {
          devId: 'Dev-234-3229-001', // Match by your model's devId field
          timestamp: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ],
    cursor: {},
  }) as unknown as {
    cursor: {
      firstBatch: {
        _id: string;
        count: number;
      }[];
    };
  };

  console.log(result)

  // Convert results to a map for easy lookup
  const countsMap = new Map(result.cursor.firstBatch.map(entry => [entry._id, entry.count]));

  // Build 7-day response
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const isoDate = date.toISOString().split('T')[0];

    return {
      day: isoDate,
      expected: 17280,
      actual: countsMap.get(isoDate) || 30,
    };
  });

  return NextResponse.json(chartData);
}
