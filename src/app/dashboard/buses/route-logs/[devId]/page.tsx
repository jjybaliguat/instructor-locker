import React from 'react'
import dynamic from 'next/dynamic'

async function GetBusRouteLogs(devId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mini-bus/route-logs?devId=${devId}`, {
            cache: "no-store"
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

const RouteMap = dynamic(() => import('@/components/map/RouteMap'), {
  ssr: false, // disable server-side rendering
  loading: () => <p>Loading map...</p>, // optional: loading fallback
})

const MiniBusRouteLogs = async ({
  params,
}: {
  params: { devId: string };
}) => {
  const devId = params.devId;

  const routeLogs = await GetBusRouteLogs(devId);

  return (
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Mini-Bus Route Logs Today</h1>
        <p>Total Gps Logs: {routeLogs.length}</p>
        <div className="min-h-[90vh] flex-1 rounded-xl bg-muted/50 md:min-h-min z-40">
            <RouteMap routeLogs={routeLogs}/>
        </div>
    </div>
  );
};

export default MiniBusRouteLogs;
