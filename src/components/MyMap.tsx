'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, Tooltip } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import MyCurrentLocationMarker from './MyCurrentLocationMarker'
import useSWR from 'swr'
import { database, onValue, ref } from '@/utils/firebase'
import mqtt from "mqtt";
import { useSession } from 'next-auth/react'
import { Device } from '@/types/Device'
import L from 'leaflet'

// Fix default icon issue in Leaflet when using Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: '',
});


interface GpsDataProps {
  lat: number,
  lon: number,
  direction: number
}

const Map = () => {
    const [message, setMessage] = useState<string | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const session = useSession()
    const user = session.data?.user
    const {data: devices, isLoading} = useSWR(user? 'getDevices' : null, GetDevices)
    const [coord, setCoord] = useState<[number, number]>([14.6810331, 121.1123889])

    const [gpsData, setGpsData] = useState<GpsDataProps[] | null>()

    async function GetDevices(){
      try {
        const response = await fetch(`/api/device?userId=${user?.id}`)
        const data = await response.json()
        return data
      } catch (error) {
        console.log(error)
        return null
      }
    }

    useEffect(() => {
      const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL || '', {
        username: process.env.NEXT_PUBLIC_MQTT_USER,
        password: process.env.NEXT_PUBLIC_MQTT_PASS,
        reconnectPeriod: 1000,
        clean: true
      });
    
        client.on("connect", () => {
          console.log("Connected to MQTT broker");
          devices?.map((device: Device)=>{
            client.subscribe(device.gpsTopic, (err) => {
              if (!err) {
                console.log(`Subscribed to ${device.gpsTopic}`);
              } else {
                console.error("Subscription error:", err);
              }
            });
          })
        });
    
        client.on("message", (topic, payload) => {
          devices?.map((device: Device, index: number) => {
            if (topic === device.gpsTopic) {
              const msg = payload?.toString();
              setMessage(msg);
              try {
                const data = JSON.parse(msg);
                if (data.lat && data.lon) {
                  setGpsData((prev) => {
                    const newData = [...(prev ?? [])];
                    newData[index] = {
                      lat: data.lat,
                      lon: data.lon,
                      direction: data.direction,
                    };
                    return newData;
                  });
                }
              } catch (e) {
                console.error("Invalid JSON received:", msg);
              }
            }
          })
        });
    
        return () => {
          client.end();
        };
      }, [devices]);
  

    function createCustomBusIcon(direction: number) {
      const iconHtml = `
        <div style="
          width: 100px;
          height: 80px;
          background-image: url('/bus-top-view.png'); 
          background-size: contain;
          background-repeat: no-repeat;
          transform: rotate(${direction+ 90}deg);
          transform-origin: center;
          transition: transform 0.3s ease;
        "></div>`;
    
      return L.divIcon({
        className: '',
        html: iconHtml,
        iconSize: [80, 80],
        iconAnchor: [40, 40],
      });
    }

    return (
        <div className='h-[50vh] md:h-[80vh] md:px-6 py-6 px-2'>
            <h1 className='text-xl font-medium'>Mini-Buses&apos; Real-Time Locations</h1>
            <MapContainer style={{
                height: '100%',
                width: '100%'
            }} center={coord} zoom={13}
            className='h-full w-full z-0 mt-4'
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MyCurrentLocationMarker />
                <Circle className='animate-pulse' center={[14.7607, 121.1568]} pathOptions={{ fillColor: 'blue' }} radius={200} />
                {devices?.map((device: Device, index: number)=>(
                  gpsData?.[index] && (
                    <>
                    <Marker key={device.id}
                      position={[gpsData[index].lat, gpsData[index].lon]}
                      // position={
                      //   gpsData?.[index]
                      //     ? { lat: gpsData[index].lat, lng: gpsData[index].lon }
                      //     : undefined
                      // }
                      icon={gpsData?.[index] ? createCustomBusIcon(gpsData[index].direction) : undefined}
                      ref={markerRef}
                    >
                      <Tooltip direction="top" offset={[0, -30]} opacity={1}>
                          <div>
                            <h1>{device.name}</h1>
                            <p>Plate No: {device.assignedBus.plateNumber}</p>
                            <p>Driver: {device.assignedBus.driver}</p>
                            <p>Conductor: {device.assignedBus.conductor}</p>
                            <p>Capacity: {device.assignedBus.capacity}</p>
                          </div>
                      </Tooltip>
                    </Marker>
                    <Circle className='animate-pulse' center={[gpsData[index]?.lat, gpsData[index].lon]} pathOptions={{ fillColor: 'blue' }} radius={100} />
                  </>
                  )
                ))}
                <Marker icon={
                        new L.Icon({
                            iconUrl: '/terminal-bus.png',
                            iconRetinaUrl: '/terminal-bus.png',
                            iconSize: [100, 100],
                            iconAnchor: [50, 50],
                            popupAnchor: [0, -41],
                            shadowUrl: '/marker-shadow.png',
                            shadowSize: [80, 80],
                        })
                    } position={[14.7607, 121.1568]}>
                         {/* <Popup>
                            Mini Bus San Isidro Terminal
                        </Popup> */}
                        <Tooltip direction="top" offset={[0, -30]} opacity={1} permanent>
                            San Isidro Mini Bus Terminal
                        </Tooltip>
                    </Marker>
            </MapContainer>
        </div>
    )
}

export default Map