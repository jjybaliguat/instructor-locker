'use client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, Tooltip } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import MyCurrentLocationMarker from './MyCurrentLocationMarker'
import useSWR from 'swr'
import { database, onValue, ref } from '@/utils/firebase'
import mqtt from "mqtt";
import { useSession } from 'next-auth/react'
import { Device } from '@/types/Device'

const MQTT_BROKER_URL = "wss://test.mosquitto.org:8081"; // Use ws:// for unsecured, wss:// for secure
const MQTT_TOPIC = "gps/mini-bus-1";

// Fix default icon issue in Leaflet when using Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: '',
});


function sortLogs(logs: any){
    let newLogs = logs?.map((a: any, b: any)=>b.createdAt - a.createdAt)
    console.log(logs?.map((a: any, b: any)=>b.createdAt - a.createdAt))
    return newLogs[0];
}

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
        console.log(data)
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
    
        // useEffect(()=>{
        //   const latRef = ref(database, 'gpsData');
        //   onValue(latRef, (snapshot: { val: () => any; }) => {
        //     const data = snapshot.val();
        //     setGpsData(data)
        //   });
        // }, [])

    useEffect(() => {
        // Function to update coordinates
        const moveMarker = () => {
            // console.log("moved")
            setCoord((prev) => [
            prev[0] + 0.00001, // Simulate latitude change
            prev[1] + 0.00001, // Simulate longitude change
          ])
        };
    
        // Update coordinates every 1 second (1000ms)
        const intervalId = setInterval(moveMarker, 1000);
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
      }, []);

    const SearchLocation = () => {
        return (
            <div className="search-location">
                <input type="text" placeholder="Search Location" />
            </div>
        )
    }

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
        <div className='w-full h-[600px]'>
            <div className="p-4">
            <h1 className='text-xl'>Mini-Buses&apos; Real-Time Locations</h1>
            </div>
            <MapContainer style={{
                height: '100%',
                width: '100%'
            }} center={coord} zoom={13} scrollWheelZoom={false}
            >
                {/* <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}
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
                          {device.name}
                          <span>{gpsData[index].lat}</span>
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