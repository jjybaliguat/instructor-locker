import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET() {
    // Get the current date
    const now = new Date();

    // Get the start of the current week (Sunday)
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Set to Sunday

    // Reset the time to midnight (00:00:00) for a clean date comparison
    startOfWeek.setHours(0, 0, 0, 0);
    const result = await prisma.$runCommandRaw({
        aggregate: 'GPSData',
        pipeline: [
            {
              $match: {
                devId: 'Dev-234-3229-001', // Filter by device ID
                timestamp: {
                  $gte: startOfWeek, // Start of the current week
                  $lte: new Date(), // Current date
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }, // Group by date
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } } // Sort by date ascending
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
      
      const chartData = result.cursor.firstBatch.map(day => ({
        day: day._id,
        expected: 17280,
        actual: day.count,
      }));

  return NextResponse.json(chartData);
}
