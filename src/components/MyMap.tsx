'use client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, Tooltip } from 'react-leaflet'
import { useEffect, useState } from 'react'
import MyCurrentLocationMarker from './MyCurrentLocationMarker'
import useSWR from 'swr'
import { getLatestDevicesCoord } from '@/app/actions'
import { database, onValue, ref } from '@/utils/firebase'

function sortLogs(logs: any){
    let newLogs = logs?.map((a: any, b: any)=>b.createdAt - a.createdAt)
    console.log(logs?.map((a: any, b: any)=>b.createdAt - a.createdAt))
    return newLogs[0];
}

const Map = () => {

    const {data: devices, isLoading} = useSWR('getLatestCoord', getLatestDevicesCoord)
    const [coord, setCoord] = useState<[number, number]>([14.6810331, 121.1123889])

    const [gpsData, setGpsData] = useState({
        latitude: 0,
        longitude: 0
      })
    
        useEffect(()=>{
          const latRef = ref(database, 'gpsData');
          onValue(latRef, (snapshot: { val: () => any; }) => {
            const data = snapshot.val();
            setGpsData(data)
          });
        }, [])

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

    return (
        <div className='w-full h-[600px] z-40'>
            <MapContainer style={{
                height: '100%',
                width: '100%'
            }} center={coord} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyCurrentLocationMarker />
                <Circle center={[14.7607, 121.1568]} pathOptions={{ fillColor: 'blue' }} radius={200} />
                <Marker icon={
                    new L.Icon({
                        iconUrl: '/marker-icon.png',
                        iconRetinaUrl: '/marker-icon.png',
                        iconSize: [50, 50],
                        iconAnchor: [20, 20],
                        popupAnchor: [0, 0],
                        shadowUrl: '/marker-shadow.png',
                        shadowSize: [80, 80],
                    })
                } position={[gpsData.latitude, gpsData.longitude]}>
                     {/* <Popup>
                        Mini Bus San Isidro Terminal
                    </Popup> */}
                    <Tooltip direction="top" offset={[0, -30]} opacity={1}>
                        Name: Maes Device 1<br />
                    </Tooltip>
                </Marker>
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